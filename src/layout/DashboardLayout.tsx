import { Outlet } from 'react-router-dom';
import Layout from './dashBoardComps/Layout';
const DashboardLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
export default DashboardLayout;
