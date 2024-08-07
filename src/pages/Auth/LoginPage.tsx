import { PrimeReactContext } from "primereact/api";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/ReduxHook";
import { IDecodeAccessTokenModel } from "../../models/loginModel";
import { loginService } from "../../Services/authServiceApi";
import { setTheme } from "../../store/action/themeAction";
import { getUserLoginInfo } from "../../store/action/userAction";
import { IThemeReducer } from "../../store/reducer/themeReducer";
import { useAppDispatch } from "../../store/store";
import { LayoutConfig } from "../../types/layout";
import { decodeJwtToken } from "../../utils/Utilities";
import { LayoutContext } from "../context/layoutcontext";
import { IToastValueContext, ToastContext } from "../context/toastContext";
import { useCookies } from 'react-cookie';



const LoginPage = () => {
  const [detailLogin, setDetailLogin] = useState({ email: "", password: "", rememberMe: false });
  const [cookies, setCookie] = useCookies(['authToken']);
  const { layoutConfig, setLayoutConfig } = useContext(LayoutContext);

  // const [selectedEmail, setSelectedEmail] = useState<string>("");
  const dispatch = useAppDispatch();
  const { IsDarkTheme } = useAppSelector(
    (state: IThemeReducer) => state.themeReducer
  );
  const { changeTheme } = useContext(PrimeReactContext);
  const _changeTheme = (theme: string, colorScheme: string) => {
    changeTheme?.(layoutConfig.theme, theme, "theme-css", () => {
      setLayoutConfig((prevState: LayoutConfig) => ({
        ...prevState,
        theme,
        colorScheme,
      }));
    });
  };
  useEffect(() => {
    IsDarkTheme
      ? _changeTheme("lara-dark-indigo", "dark")
      : _changeTheme("lara-light-indigo", "light");
  }, [IsDarkTheme]);
  // const emailOpts = [
  //   {
  //     email: "admin@gmail.com",
  //   },
  //   {
  //     email: "tester@gmail.com",
  //   },
  // ];
  const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);

  // const { layoutConfig } = useContext(LayoutContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (detailLogin.email && detailLogin.password) {
      const data = await loginService(detailLogin);

      if (data) {
        const decodeAccessToken = decodeJwtToken(
          data.access_token
        ) as IDecodeAccessTokenModel;
        data.role = decodeAccessToken.role;
        dispatch(
          getUserLoginInfo(
            decodeAccessToken.id,
            decodeAccessToken.email,
            decodeAccessToken.user_name,
            decodeAccessToken.role
          )
        );
        const cookieOptions = detailLogin.rememberMe ? { path: '/', maxAge: 604800 } : { path: '/' }; // 1 week = 604800 seconds 
        setCookie('authToken', data.access_token, cookieOptions);
        localStorage.setItem("Token", JSON.stringify(data));
        if (data.role === 1) {
          navigate("/dashboard");
        } else {
          navigate("/client/projects");
        }
        setShowModelToast((pre) => {
          return {
            ...pre,
            severity: "success",
            summary: "Success",
            detail: "Login Success",
          };
        });
        return;
      } else {
        setShowModelToast((pre) => {
          return {
            ...pre,
            severity: "error",
            summary: "Error",
            detail: "Login failed: Email or Password is incorrect.",
          };
        });
        return;
      }
    } else {
      setShowModelToast((pre) => {
        return {
          ...pre,
          severity: "info",
          summary: "Warning",
          detail: "Pls! fill Email and Password",
        };
      });
      return;
    }
  };

  return (
    <div className="flex flex-column align-items-center justify-content-center">
      <div
        style={{
          borderRadius: "56px",
          padding: "0.3rem",
          background:
            "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
        }}>
        <div
          className="w-full surface-card py-8 px-5 sm:px-8"
          style={{ borderRadius: "53px" }}>
          <div className="text-center mb-5">
            <div className="text-900 text-3xl font-medium mb-3">Welcome!!</div>
            <span className="text-600 font-medium">Sign in to continue</span>
          </div>

          <div>
            <div>
              <label
                htmlFor="email"
                className="block text-900 text-xl font-medium mb-2">
                Email
              </label>
              <InputText className="w-full md:w-30rem mb-5" value={detailLogin.email} onChange={(e) => setDetailLogin((prev) => ({ ...prev, email: e.target.value }))} />

            </div>

            {/* <Dropdown
              value={selectedEmail}
              onChange={(e) => {
                const selectedEmailAddress = e.value.email;
                setSelectedEmail(e.value);
                setDetailLogin((prev) => ({
                  ...prev,
                  email: selectedEmailAddress,
                  password: "admin",
                }));
              }}
              options={emailOpts}
              optionLabel="email"
              placeholder="Select Email"
              className="w-full md:w-30rem mb-5"
            /> */}
            <div>
              <label
                htmlFor="Password"
                className="block text-900 text-xl font-medium mb-2">
                Password
              </label>
              <Password className="mb-5" value={detailLogin.password} onChange={(e) => setDetailLogin((prev) => ({ ...prev, password: e.target.value }))} feedback={false} toggleMask />

            </div>

            <div className="flex align-items-center justify-content-between mb-5 gap-5">
              <div className="flex align-items-center">
                <Checkbox
                  checked={detailLogin.rememberMe}
                  onChange={(e) => setDetailLogin({ ...detailLogin, rememberMe: e.target.checked ?? false })}
                  className="mr-2"></Checkbox>
                <label >Remember me</label>
              </div>
              <Link to={"/auth/forgot-password"}>
                <p className="font-medium no-underline ml-2 text-right cursor-pointer">
                  Forgot password?
                </p>
              </Link>
            </div>
            <div className="flex align-items-center justify-content-between mb-5 gap-2">
              <div className="flex align-items-center">
                <InputSwitch
                  checked={IsDarkTheme}
                  onChange={() => {
                    dispatch(setTheme(!IsDarkTheme));
                  }}
                  className="mr-2"
                />
                <label htmlFor="rememberme1">Switch dark/light</label>
              </div>
              <Link to={"/auth/signup"}>
                <p className="p-3 text-sm font-bold underline text-blue-400 cursor-pointer">
                  Create new account
                </p>
              </Link>
            </div>

            <Button
              label="Sign In"
              className="w-full p-3 text-xl"
              onClick={handleLogin}></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
