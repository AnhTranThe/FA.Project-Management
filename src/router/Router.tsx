import { Navigate, useRoutes } from 'react-router-dom';
import AccessDeniedPage from '../views/error/notAuth';
import ErrorPage from '../views/error/InternalServerError';
import NotFoundPage from '../views/error/notFound';
import allRoutes from './routes/allRoutes';
import BlankLayout from '../layout/BlankLayout';
import { getHomeRouteForLoggedInUser } from './routes/privateRouter';

const Router = () => {
  // eslint-disable-next-line no-constant-condition
  const getHomeRoute = () => (getHomeRouteForLoggedInUser());
  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />,
    },
    ...allRoutes,
    {
      path: '/error',
      element: <BlankLayout />,
      children: [
        {
          path: '/error',
          element: <Navigate replace to={'/'} />,
        },
        {
          path: 'not-auth',
          element: <AccessDeniedPage />,
        },
        {
          path: 'internal-error',
          element: <ErrorPage />,
        },
      ],
    },
    {
      path: '*',
      children: [{ path: '*', element: <NotFoundPage /> }],
    },
  ]);

  return routes;
};

export default Router;
