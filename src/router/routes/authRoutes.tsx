import { Navigate } from "react-router-dom";
import { IRouteModel } from "../../models/routerModel";
import AuthLayout from "../../pages/AuthLayout";
import LoginPage from "../../pages/Auth/LoginPage";
import SignupPage from "../../pages/Auth/SignupPage";

const authRoutes: IRouteModel = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    {
      path: "/auth",
      element: <Navigate to="/auth/login" replace />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "signup",
      element: <SignupPage />,
    },
  ],
};
export default authRoutes;
