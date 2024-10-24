import React from 'react';
import { Navigate } from 'react-router-dom';
import useNotification from 'hooks/useNotification';

interface ProtectedRouteProps {
  element: React.ReactNode;
  isLoggedIn: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, isLoggedIn }) => {
  const { openNotification } = useNotification();
  if (!isLoggedIn) {
    openNotification('error', '로그인 후 이용 가능해요.');
  }

  return isLoggedIn ? <>{element}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
