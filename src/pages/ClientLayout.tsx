import { Outlet } from "react-router-dom";
import ClientAppLayout from "../components/Client/ClientAppLayout";

export default function ClientLayout() {
  return (
    <ClientAppLayout>
      <Outlet />
    </ClientAppLayout>
  );
}
