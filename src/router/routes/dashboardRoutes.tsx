

import { Navigate } from "react-router-dom";
import { IRouteModel } from "../../models/routerModel";
import ProjectAdmin from "../../pages/Project/ProjectAmin";
import DashboardLayout from "../../pages/DashboardLayout";
import Dashboard from "../../viewsTemplate";
import UserPrivateRoute from "./userPrivateRouter";

const dashboardRoutes: IRouteModel =
{
  path: "/",
  element: (
    <UserPrivateRoute>
      <DashboardLayout />
    </UserPrivateRoute>
  ),
  children: [
    {
      path: '/dashboard',
      element: <Dashboard />
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
}
export default dashboardRoutes;
