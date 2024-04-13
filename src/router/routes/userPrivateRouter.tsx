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
export default function UserPrivateRoute({ children }: IUserPrivateRouteProps) {
  const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
  const { detailUser } = useAppSelector(
    (state: ILoginReducer) => state.loginReducer
  );

  useEffect(() => {
    if (!detailUser) {
      console.log("client");
      setShowModelToast((pre) => ({
        ...pre,
        severity: "warn",
        summary: "Warning",
        detail: "Pls!! Login",
      }));
    }
  }, [detailUser, setShowModelToast]);

  if (!detailUser) {
    return <Navigate to={"/auth/login"} />;
  }

  // if (!detailUser) {
  //   console.log("client");
  //   setShowModelToast((pre) => {
  //     return {
  //       ...pre,
  //       severity: "warn",
  //       summary: "Warning",
  //       detail: "Pls!! Login",
  //     };
  //   });
  //   return <Navigate to={"/auth/login"} />;
  // }

  return <>{children}</>;
}
