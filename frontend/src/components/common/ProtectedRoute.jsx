import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken, getAuthUser } from '../../utils/api';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = getAuthToken();
  const { userRole } = getAuthUser();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
