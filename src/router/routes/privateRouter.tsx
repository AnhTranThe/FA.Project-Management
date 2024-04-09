export const getHomeRouteForLoggedInUser = (userRole: string) => {
    if (userRole === 'admin') return '/dashboard';
    if (userRole !== 'admin') return '/auth/not-auth';
    return '/login';
};
