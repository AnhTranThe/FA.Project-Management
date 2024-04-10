import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  children: ReactNode;
}
export default function AutthenUser({ children }: IProps) {
  const userData = localStorage.getItem("user");
  if (!userData) {
    return <Navigate to={"/auth/login"} />;
  }
  return <div>{children}</div>;
}
