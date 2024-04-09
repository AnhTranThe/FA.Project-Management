import { Navigate } from 'react-router-dom';
import EmptyPage from '../../../views/pages/empty';
import TimelineDemo from '../../../views/pages/timeline';


const pagesRoutes = [
  {
    path: '/pages',
    children: [
      {
        path: '/pages',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'timeline',
        element: <TimelineDemo />,
      },
      {
        path: 'empty',
        element: <EmptyPage />,
      },

    ],
  },
];

export default pagesRoutes;
