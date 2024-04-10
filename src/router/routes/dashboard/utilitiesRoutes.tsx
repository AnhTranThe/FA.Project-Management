import { Navigate } from "react-router-dom";

const utilitiesRoutes = [
  {
    path: "utilities",
    children: [
      {
        path: "/utilities",
        element: <Navigate to="/" replace />,
      },
    ],
  },
];

export default utilitiesRoutes;
