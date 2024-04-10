import AutthenUser from "../../../components/AutthenUser";
import DashboardLayout from "../../../layout/DashboardLayout";
import homeRoutes from "./homeRoutes";
import uiComponentsRoutes from "./uiComponentsRoutes";
import pagesRoutes from "./pagesRoutes";
import utilitiesRoutes from "./utilitiesRoutes";

const dashboardRoutes = [
  {
    path: "/",
    element: (
      <AutthenUser>
        <DashboardLayout />
      </AutthenUser>
    ),
    children: [
      ...homeRoutes,
      ...uiComponentsRoutes,
      ...utilitiesRoutes,
      ...pagesRoutes,
    ],
  },
];
export default dashboardRoutes;
