
import DashboardLayout from '../../../layout/DashboardLayout';
import homeRoutes from './homeRoutes';
import pagesRoutes from './pagesRoutes';
import uiComponentsRoutes from './uiComponentsRoutes';
import utilitiesRoutes from './utilitiesRoutes';

const dashboardRoutes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [...homeRoutes, ...uiComponentsRoutes, ...utilitiesRoutes, ...pagesRoutes],
  },
];
export default dashboardRoutes;
