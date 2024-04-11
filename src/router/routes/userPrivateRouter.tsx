
import { Navigate } from "react-router-dom"
interface IUserPrivateRouteProps {
  children: React.ReactNode
}
export default function UserPrivateRoute({ children }: IUserPrivateRouteProps) {
  if (!localStorage.getItem("user")) {
    return <Navigate to={"/auth/login"} />
  }
  return (
    <>{children}</>
  )
}

