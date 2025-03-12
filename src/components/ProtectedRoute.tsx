import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import Loading from './Loading';
import toast from 'react-hot-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, isAdmin, loading } = useAuth();

  console.log('ProtectedRoute Check:', {
    userEmail: user?.email,
    isAdmin,
    adminOnly,
    loading
  });

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    toast.error('Please sign in to access this page');
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    console.log('Admin access denied:', {
      userEmail: user?.email,
      isAdmin,
      adminOnly
    });
    toast.error('Access denied. Admin privileges required.');
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 