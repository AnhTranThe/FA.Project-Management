import { Outlet } from 'react-router-dom';

const BlankLayout = () => {
  return (
    <div className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
      <Outlet />
    </div>
  );
};

export default BlankLayout;
