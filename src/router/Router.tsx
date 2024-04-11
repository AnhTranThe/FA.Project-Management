import { useRoutes } from "react-router-dom";
import NotFoundPage from "../viewsTemplate/error/notFound";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import errorRoutes from "./routes/errorRoutes";


const Router = () => {
  // eslint-disable-next-line no-constant-condition
  const routes = useRoutes([
    authRoutes,
    dashboardRoutes,
    errorRoutes,
    {
      path: "*",
      children: [{ path: "*", element: <NotFoundPage /> }],
    },
  ]);

  return routes;
};

export default Router;
