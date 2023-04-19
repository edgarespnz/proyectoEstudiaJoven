import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase';
import {getAuth , updateProfile} from "firebase/auth"
import { addDoc, collection,setDoc,getDocs,getDoc, doc} from 'firebase/firestore/lite';
import { db } from '../firebase';


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true);

  async function signup(email, password, names, lastNames) {
    try {
      const credentials = await auth.createUserWithEmailAndPassword(email, password);
      await setDoc(doc(db,"users", credentials.user.uid),{
        name: names,
        lastNames : lastNames,
        rol: "Alumno"
      })
      sendVerifyEmail()
    } catch (error) {
      return error;
    }
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  
  async function getUserData(){
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      return docSnap.data()
    }
    else{
      console.log("no existe el documento")
    }

  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function sendVerifyEmail(){
    return auth.sendEmailVerification()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setLoading(false)
      setCurrentUser(user);
    })
    return unsubscribe;
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    getUserData
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
