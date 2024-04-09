import { Navigate } from 'react-router-dom';
import AuthLayout from '../../../layout/AuthLayout';
import LoginPage from '../../../views/auth/login';

const authRoutes = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth',
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
];

export default authRoutes;
