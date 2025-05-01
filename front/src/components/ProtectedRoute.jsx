// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate }          from "react-router-dom";
import { AuthContext }       from "../context/AuthContext";

export default function ProtectedRoute({ children, requireRole }) {
  const { auth } = useContext(AuthContext);

  if (!auth.token) {
    // not logged in
    return <Navigate to="/login" replace />;
  }
  if (requireRole && auth.role !== requireRole) {
    // wrong role
    return <Navigate to="/login" replace />;
  }
  return children;
}