import Dashboard from "../../../views";

const homeRoutes = [
    {
        path: '/dashboard',
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            }
        ]
    }
];
export default homeRoutes;
