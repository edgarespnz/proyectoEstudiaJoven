import firebase from 'firebase/compat/app'
import "firebase/compat/auth";
import { getFirestore } from 'firebase/firestore/lite';



const app = firebase.initializeApp({

  apiKey: "AIzaSyAhp4-7kYwkti3OHjCeQQDmrxZ9rBcqrek",
  authDomain: "estudia-joven.firebaseapp.com",
  projectId: "estudia-joven",
  storageBucket: "estudia-joven.appspot.com",
  messagingSenderId: "656092966131",
  appId: "1:656092966131:web:819dcb9cc9310dfa5e9b86"
  });


export const auth = app.auth();
export const db = getFirestore(app);

export default app;