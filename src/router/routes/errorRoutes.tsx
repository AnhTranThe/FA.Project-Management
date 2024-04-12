import { IRouteModel } from "../../models/routerModel";
import BlankLayout from "../../pages/BlankLayout";
import ErrorPage from "../../viewsTemplate/error/InternalServerError";
import AccessDeniedPage from "../../viewsTemplate/error/notAuth";

const errorRoutes: IRouteModel = {
  path: "/error",
  element: <BlankLayout />,
  children: [
    {
      path: "/error",
      element: <ErrorPage />,
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
