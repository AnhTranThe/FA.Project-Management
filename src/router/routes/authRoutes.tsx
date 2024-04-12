import { Navigate } from 'react-router-dom';
import { IRouteModel } from '../../models/routerModel';
import AuthLayout from '../../pages/AuthLayout';
import LoginPage from '../../pages/Auth/LoginPage';


const authRoutes: IRouteModel =
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
}
export default authRoutes;
