import { Navigate } from "react-router-dom";
import ProjectAdmin from "../../../layout/AdminPage/ProjectAmin";

const utilitiesRoutes = [
  {
    path: "utilities",
    children: [
      {
        path: "/utilities",
        element: <Navigate to="/" replace />,
      },
      {
        path: "/utilities/project",
        element: <ProjectAdmin />,
      },
    ],
  },
];

export default utilitiesRoutes;
