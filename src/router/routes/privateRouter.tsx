export const getHomeRouteForLoggedInUser = () => {
  const userData = localStorage.getItem("user");

  if (userData) {
    return "/dashboard";
  }
  return "/auth/login";
  //   if (userRole === "admin") return "/dashboard";
  //   if (userRole !== "admin") return "/auth/not-auth";
};
