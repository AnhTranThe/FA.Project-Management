import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  children: ReactNode;
}
export default function AutthenUser({ children }: IProps) {
  const data = localStorage.getItem("user");

  if (!data) {
    return <Navigate to={"/auth/login"} />;
  }
  return <div>{children}</div>;
}
