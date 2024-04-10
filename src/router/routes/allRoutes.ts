import authRoutes from "./auth/authRoutes";
import dashboardRoutes from "./dashboard/dashboardRoutes";
import uiComponentsRoutes from "./dashboard/uiComponentsRoutes";

const allRoutes = [...dashboardRoutes, ...authRoutes, ...uiComponentsRoutes];

export default allRoutes;
