import { Outlet } from "react-router-dom";
import Layout from "../components/Dashboard/Layout";
const DashboardLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
export default DashboardLayout;
