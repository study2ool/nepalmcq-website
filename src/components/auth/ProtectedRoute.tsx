import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { openAuthModal } from '../../store/api/authApi';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  triggerAuthModal?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/practice',
  triggerAuthModal = true,
}) => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && triggerAuthModal) {
      dispatch(openAuthModal());
    }
  }, [isLoading, isAuthenticated, triggerAuthModal, dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

