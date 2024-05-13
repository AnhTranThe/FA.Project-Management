import { useRoutes } from "react-router-dom";
import ClientLayout from "../pages/ClientLayout";
import DashboardLayout from "../pages/DashboardLayout";
import ProjectAdmin from "../pages/Project/ProjectAdmin";
import ProjectsUser from "../pages/Project/ProjectsUser";
import TaskAdmin from "../pages/Task/TaskAdmin";
import UserAdmin from "../pages/User/UserAdmin";
import Dashboard from "../viewsTemplate";
import NotFoundPage from "../viewsTemplate/error/notFound";
import AdminPrivateRoute from "./routes/AdminPrivateRoute";
import authRoutes from "./routes/authRoutes";
import errorRoutes from "./routes/errorRoutes";
import UserPrivateRoute from "./routes/userPrivateRouter";
import ProjectUserBoard from "../pages/Project/ProjectUserBoard";
import DetailServiceUser from "../components/Client/DetailServiceUser";
import ProjectUserDetailService from "../pages/Project/ProjectUserDetailService";
import TaskUserDetailService from "../pages/Task/TaskUserDetailService";

const Router = () => {
  // eslint-disable-next-line no-constant-condition
  const routes = useRoutes([
    authRoutes,
    errorRoutes,
    {
      path: "/",
      element: (
        <AdminPrivateRoute>
          <DashboardLayout />
        </AdminPrivateRoute>
      ),
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
          children: [
            {
              path: "/dashboard/user",
              element: <UserAdmin />,
            },
            {
              path: "/dashboard/project",
              element: <ProjectAdmin />,
            },
            {
              path: "/dashboard/task",
              element: <TaskAdmin />,
            },
          ],
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
      path: "/client",
      element: (
        <UserPrivateRoute>
          <ClientLayout />
        </UserPrivateRoute>
      ),
      children: [
        {
          path: "/client/projects",
          element: <ProjectsUser />,
        },
        {
          path: "/client/projects/:id/board",
          element: <ProjectUserBoard />,
        },
        {
          path: "/client/user-service",
          element: <DetailServiceUser />,
          children: [
            {
              path: "/client/user-service/project",
              element: <ProjectUserDetailService />,
            },
            {
              path: "/client/user-service/task",
              element: <TaskUserDetailService />,
            },
          ],
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
