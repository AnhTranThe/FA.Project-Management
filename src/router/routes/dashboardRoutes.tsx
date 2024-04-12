import { Navigate } from "react-router-dom";
import { IRouteModel } from "../../models/routerModel";
import ProjectAdmin from "../../pages/Project/ProjectAmin";
import DashboardLayout from "../../pages/DashboardLayout";
import Dashboard from "../../viewsTemplate";
import UserPrivateRoute from "./userPrivateRouter";
import UserAdmin from "../../pages/User/UserAdmin";
import DetailUser from "../../pages/User/DetailUser";

const dashboardRoutes: IRouteModel = {
  path: "/",
  element: (
    <UserPrivateRoute>
      <DashboardLayout />
    </UserPrivateRoute>
  ),
  children: [
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/uikit/user",
      element: <UserAdmin />,
      children: [
        {
          path: "/uikit/user/detail/:email",
          element: <DetailUser />,
        },
      ],
    },
    {
      path: "/utilities",
      element: <Navigate to="/" replace />,
    },
    {
      path: "/utilities/project",
      element: <ProjectAdmin />,
    },
  ],
};
export default dashboardRoutes;
