import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/ReduxHook";
import { ILoginReducer } from "../../models/loginModel";
import { useContext, useEffect } from "react";
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

  const { detailUser } = useAppSelector(
    (state: ILoginReducer) => state.loginReducer
  );

  useEffect(() => {
    if (!detailUser) {
      console.log("admin");
      setShowModelToast((pre) => ({
        ...pre,
        severity: "warn",
        summary: "Warning",
        detail: "Pls!! Login",
      }));
      return;
    } else if (detailUser && detailUser.Role !== 1) {
      setShowModelToast((pre) => ({
        ...pre,
        severity: "warn",
        summary: "Warning",
        detail: "Client cann't Go To Page Admin",
      }));
      return;
    }
  }, [detailUser, setShowModelToast]);

  if (!detailUser) {
    return <Navigate to={"/auth/login"} />;
  }

  if (detailUser && detailUser.Role !== 1) {
    return <Navigate to={"/client"} />;
  }
  return <>{children}</>;
}
