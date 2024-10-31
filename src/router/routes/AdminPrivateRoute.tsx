import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  IToastValueContext,
  ToastContext,
} from "../../pages/context/toastContext";

interface IUserPrivateRouteProps {
  children: React.ReactNode;
}
export default function AdminPrivateRoute({
  children,
}: IUserPrivateRouteProps) {
  const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);

  const loginDetail = JSON.parse(sessionStorage.getItem("Token")!);

  useEffect(() => {
    if (!loginDetail) {
      setShowModelToast((pre) => ({
        ...pre,
        severity: "warn",
        summary: "Warning",
        detail: "Pls!! Login",
      }));
    }

    if (loginDetail && loginDetail.role !== 1) {
      setShowModelToast((pre) => ({
        ...pre,
        severity: "warn",
        summary: "Warning",
        detail: "User cannot go to page Admin",
      }));
    }
  }, []);

  if (!loginDetail) {
    return <Navigate to={"/auth/login"} />;
  }

  if (loginDetail && loginDetail.role !== 1) {
    return <Navigate to={"/client/projects"} />;
  }
  return <>{children}</>;
}
