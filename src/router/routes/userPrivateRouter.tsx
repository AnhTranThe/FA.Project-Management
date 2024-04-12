import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/ReduxHook";
import { ILoginReducer } from "../../models/loginModel";

interface IUserPrivateRouteProps {
  children: React.ReactNode;
}
export default function UserPrivateRoute({ children }: IUserPrivateRouteProps) {
  const { detailUser } = useAppSelector(
    (state: ILoginReducer) => state.loginReducer
  );

  if (!detailUser) {
    return <Navigate to={"/auth/login"} />;
  }
  return <>{children}</>;
}
