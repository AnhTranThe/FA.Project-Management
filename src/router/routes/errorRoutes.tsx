import { Navigate } from "react-router-dom";
import { IRouteModel } from "../../models/routerModel";
import BlankLayout from "../../pages/BlankLayout";
import AccessDeniedPage from "../../viewsTemplate/error/notAuth";
import ErrorPage from "../../viewsTemplate/error/InternalServerError";

const errorRoutes: IRouteModel = {
  path: "/error",
  element: <BlankLayout />,
  children: [
    {
      path: "/error",
      element: <Navigate replace to={"/"} />,
    },
    {
      path: "not-auth",
      element: <AccessDeniedPage />,
    },
    {
      path: "internal-error",
      element: <ErrorPage />,
    },
  ],
};
export default errorRoutes;
