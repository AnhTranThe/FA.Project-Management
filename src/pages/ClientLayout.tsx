import { Button } from "primereact/button";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { logoutAction } from "../store/action/loginiAction";

export default function ClientLayout() {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAction());
    nav("/auth/login");
  };

  return (
    <div>
      DEMO LAYOUT CLIENT
      <Button onClick={handleLogout}>Logout</Button>
      <Outlet />
    </div>
  );
}
