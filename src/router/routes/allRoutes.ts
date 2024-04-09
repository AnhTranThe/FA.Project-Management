import authRoutes from "./auth/authRoutes";
import dashboardRoutes from "./dashboard/dashboardRoutes";

const allRoutes = [...dashboardRoutes, ...authRoutes];

export default allRoutes;
