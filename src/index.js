import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './auth/ForgotPassword';
import Profile from './components/Pages/Profile';
import VerifyEmail from './components/Pages/VerifyEmail';
import Dashboard from './components/Pages/Dashboard';
import Course from './components/Pages/Course';
import Header from './components/Pages/Header';

const router = createBrowserRouter([
  {
    basename : "/dashboard"
  },
  
  {
    path: '/signup' , element: <SignUp />,
  },
  {
    path: '/login' , element: <Login/>
  },
  {
    path: '/profile' , element: <PrivateRoute><Profile/></PrivateRoute>
  },
  {
    path: '/reset-password' , element: <ForgotPassword/>
  },
  {
    path: '/verify-email' , element: <PrivateRoute><VerifyEmail/></PrivateRoute>
  },
  {
    path: '/dashboard' , element: <PrivateRoute><Dashboard/></PrivateRoute>
  },
  {
    path: 'courses/course' , element: <PrivateRoute><Course/></PrivateRoute>
  }
])



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <AuthProvider>
    <>
    <Header/>
      <RouterProvider router={router} />
    </>
  </AuthProvider>

);
