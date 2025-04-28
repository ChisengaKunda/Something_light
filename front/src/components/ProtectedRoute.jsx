import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireRole }) => {
  const token = localStorage.getItem('token');
  const role  = localStorage.getItem('role');

  if (!token) {
    // Not logged in, kick to login
    return <Navigate to="/login" replace />;
  }
  if (requireRole && role !== requireRole) {
    // Wrong role, could show a 403 page
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
