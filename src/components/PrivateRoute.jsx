import React from "react";

import {  Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth(); //verifies if the current user is logged in

  return currentUser ? children : <Navigate to="/login" />;
}