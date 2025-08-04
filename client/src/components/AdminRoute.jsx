import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = () => {
  const { user, loading } = useContext(AuthContext);

  // Wait until the user's auth status has been checked
  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  // If user is loaded, check if they are logged in and an admin
  return user && user.isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
