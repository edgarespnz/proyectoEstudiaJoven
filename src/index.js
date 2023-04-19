import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/Pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './auth/ForgotPassword';
import Profile from './components/Pages/Profile';
import VerifyEmail from './components/Pages/VerifyEmail';

const router = createBrowserRouter([
  {
    path: '/signup' , element: <SignUp />,
  },
  {
    path: '/login' , element: <Login/>
  },
  {
    path: '/profile' , element: <PrivateRoute><Dashboard/></PrivateRoute>
  },
  {
    path: '/reset-password' , element: <ForgotPassword/>
  },
  {
    path: '/dashboard' , element: <PrivateRoute><Profile/></PrivateRoute>
  },
  {
    path: '/verify-email' , element: <PrivateRoute><VerifyEmail/></PrivateRoute>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <AuthProvider>
    <>
      <RouterProvider router={router} />
    </>
  </AuthProvider>

);
