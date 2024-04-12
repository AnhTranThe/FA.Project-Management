import { useRoutes } from "react-router-dom";
import NotFoundPage from "../viewsTemplate/error/notFound";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import errorRoutes from "./routes/errorRoutes";
import UserPrivateRoute from "./routes/userPrivateRouter";
import DashboardLayout from "../pages/DashboardLayout";
import Dashboard from "../viewsTemplate";
import UserAdmin from "../pages/User/UserAdmin";
import TaskAdmin from "../pages/Task/TaskAdmin";
import ProjectAdmin from "../pages/Project/ProjectAmin";

const Router = () => {
  // eslint-disable-next-line no-constant-condition
  const routes = useRoutes([
    authRoutes,
    // dashboardRoutes,
    errorRoutes,
    {
      path: "/",
      element: (
        <UserPrivateRoute>
          <DashboardLayout />
        </UserPrivateRoute>
      ),
      children: [
        {
          index: true,
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
    },
    {
      path: "*",
      children: [{ path: "*", element: <NotFoundPage /> }],
    },
  ]);

  return routes;
};

export default Router;
