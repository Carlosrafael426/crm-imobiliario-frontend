import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function ProtectedRoute({ role, children }) {
  const { user } = useAuth();

  if (role && user?.role !== role) {
    return <Navigate to="/app" replace />;
  }

  return children;
}
