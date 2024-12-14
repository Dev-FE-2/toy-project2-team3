import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteParams {
  isLoggedIn: boolean;
  children: ReactNode;
}

const ProtectedRoute = ({ isLoggedIn, children }: ProtectedRouteParams) => {
  // 인증되지 않았으면 로그인 페이지로 리다이렉트
  // 인증되었으면 자식 컴포넌트를 렌더링

  return !isLoggedIn ? <Navigate to="/login" replace /> : children;
};

export default ProtectedRoute;
