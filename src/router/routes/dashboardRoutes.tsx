

import { IRouteModel } from "../../models/routerModel";
import DashboardLayout from "../../pages/DashboardLayout";
import ProjectAdmin from "../../pages/Project/ProjectAmin";
import TaskAdmin from "../../pages/Task/TaskAdmin";
import DetailUser from "../../pages/User/DetailUser";
import UserAdmin from "../../pages/User/UserAdmin";
import Dashboard from "../../viewsTemplate";
import UserPrivateRoute from "./userPrivateRouter";

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
      path: "/admin/task",
      element: <TaskAdmin />,
    },
    {
      path: "/admin/project",
      element: <ProjectAdmin />,
    },

  ],
};
export default dashboardRoutes;
