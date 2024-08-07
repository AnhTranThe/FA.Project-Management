import { createContext, useEffect, useState } from "react";
import { useAppDispatch } from "../store/store";
import { useCookies } from "react-cookie";
import { decodeJwtToken } from "./Utilities";
import { getUserLoginInfo } from "../store/action/userAction";
import { IDecodeAccessTokenModel } from "../models/loginModel";

const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = cookies.authToken;
    if (token) {
      setAuthToken(token);
      const decodedToken = decodeJwtToken(token) as IDecodeAccessTokenModel;
      dispatch(
        getUserLoginInfo(
          decodedToken.id,
          decodedToken.email,
          decodedToken.user_name,
          decodedToken.role
        )
      );
    }
  }, [cookies, dispatch]);

  const handleLogout = () => {
    removeCookie("authToken", { path: "/" });
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
