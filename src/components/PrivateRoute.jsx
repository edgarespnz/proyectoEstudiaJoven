import React from "react";

import {  Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

//TODO: crear ruta privada para que muestre páginas según tipo de usuario

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth(); //verifies if the current user is logged in

  return currentUser ? children : <Navigate to="/login" />;
}