import { IRouteModel } from "../../models/routerModel";
import DashboardLayout from "../../pages/DashboardLayout";
import ProjectAdmin from "../../pages/Project/ProjectAmin";
import TaskAdmin from "../../pages/Task/TaskAdmin";
import UserAdmin from "../../pages/User/UserAdmin";
import Dashboard from "../../viewsTemplate";
import AdminPrivateRoute from "./AdminPrivateRoute";


const dashboardRoutes: IRouteModel = {
  path: "/",
  element: (
    <AdminPrivateRoute>
      <DashboardLayout />
    </AdminPrivateRoute>
  ),
  children: [
    {
      path: "/admin/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/admin/user",
      element: <UserAdmin />,
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
