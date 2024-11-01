import { useFormik } from "formik";
import { PrimeReactContext } from "primereact/api";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpService } from "../../Services/authServiceApi";
import { useAppSelector } from "../../hooks/ReduxHook";
import { ISignUpModel } from "../../models/loginModel";
import { setTheme } from "../../store/action/themeAction";
import { IThemeReducer } from "../../store/reducer/themeReducer";
import { useAppDispatch } from "../../store/store";
import { LayoutConfig } from "../../types";
import { validateSignUp } from "../../utils/yup";
import { LayoutContext } from "../context/layoutcontext";
import { IToastValueContext, ToastContext } from "../context/toastContext";

export default function SignupPage() {
  const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
  const nav = useNavigate();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const handleVisiblePassword = () => setPasswordVisible(!isPasswordVisible);
  const handleSignUp = async (detaiSignUp: ISignUpModel) => {
    const res = await signUpService(detaiSignUp);
    if (res && res.code === 200) {
      setShowModelToast({
        severity: "success",
        summary: "Success",
        detail: "Sign Up Success",
      });
      nav("/auth/login")
    } else {
      setShowModelToast({
        severity: "warn",
        summary: "Warning",
        detail: `${res?.message || "Something Wrong"}`,
      });
    }
  };
  const { layoutConfig, setLayoutConfig } = useContext(LayoutContext);
  const { IsDarkTheme } = useAppSelector(
    (state: IThemeReducer) => state.themeReducer
  );
  const dispatch = useAppDispatch();
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


  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      role: 2,
    },
    validationSchema: validateSignUp,
    onSubmit: (value) => {
      handleSignUp(value);
    },
  });
  return (
    <div className="flex flex-column align-items-center justify-content-center Signup ">
      <div
        style={{
          borderRadius: "56px",
          padding: "0.3rem",
          background:
            "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
        }}>
        <div
          className="w-full surface-card py-4 px-5 sm:px-8 "
          style={{ borderRadius: "53px" }}>
          <div className="text-center mb-5">
            <div className="text-900 text-3xl font-medium mb-3">Welcome!!</div>
            <span className="text-600 font-medium">
              Sign up to continue with App...
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="item-form mb-3">
              <label
                htmlFor="name"
                className="block text-900 font-medium text-sm ml-1 mb-2">
                Name
              </label>
              <InputText
                id="name"
                placeholder="name..."
                required
                className="w-full"
                data-pr-classname="w-full p-3 md:w-30rem"
                defaultValue={values.name}
                onChange={handleChange}
                onBlur={handleBlur}></InputText>
              <br />
              <div className="my-3 pl-2">
                {errors.name && touched.name && (
                  <span className="text-red-500 my-3">{errors.name}</span>
                )}
              </div>
            </div>
            <div className="item-form mb-3">
              <label
                htmlFor="email"
                className="block text-900 text-sm ml-1 font-medium mb-2">
                Email
              </label>

              <InputText
                id="email"
                type="text"

                placeholder="email..."
                className="w-full md:w-30rem"
                style={{ padding: "1rem" }}
                defaultValue={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />

              <div className="my-3 pl-2">
                {errors.email && touched.email && (
                  <span className="text-red-500 my-3">{errors.email}</span>
                )}
              </div>

            </div>
            <div className="item-form mb-3">
              <label
                htmlFor="password"
                className="block text-900 font-medium text-sm ml-1 mb-2">
                Password
              </label>
              <div className="p-inputgroup">
                <InputText
                  id="password"
                  placeholder="password..."
                  type={isPasswordVisible ? "text" : "password"}
                  required
                  className="w-full"
                  data-pr-classname="w-full p-3 md:w-30rem"
                  defaultValue={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}></InputText>

                <Button
                  icon={isPasswordVisible ? "pi pi-eye-slash" : "pi pi-eye"}
                  onClick={handleVisiblePassword}
                  className="p-button-text"
                  aria-label="Toggle Password Visibility"
                />
              </div>
              <div className="my-3 pl-2">
                {errors.password && touched.password && (
                  <span className="text-red-500 my-3">{errors.password}</span>
                )}
              </div>



            </div>

            <div className="item-form mb-3">
              <label
                htmlFor="confirmPassword"
                className="block text-900 font-medium text-sm ml-1 mb-2">
                Confirm Password
              </label>
              <div className="p-inputgroup">
                <InputText
                  id="confirmPassword"
                  placeholder="Confirm password..."
                  type={isPasswordVisible ? "text" : "password"}
                  required
                  className="w-full"
                  data-pr-classname="w-full p-3 md:w-30rem"
                  defaultValue={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}></InputText>

                <Button
                  icon={isPasswordVisible ? "pi pi-eye-slash" : "pi pi-eye"}
                  onClick={handleVisiblePassword}
                  className="p-button-text"
                  aria-label="Toggle confirm password Visibility"
                />
              </div>
              <div className="my-3 pl-2">
                {errors.confirmPassword && touched.confirmPassword && (
                  <span className="text-red-500 my-3">{errors.confirmPassword}</span>
                )}
              </div>



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
              <Link to={"/auth/login"}>
                <p className="p-3 text-sm font-bold underline text-blue-400 cursor-pointer">
                  Sign In
                </p>
              </Link>
            </div>
            <Button
              label="Sign Up"
              type="submit"
              className="w-full p-3 text-xl"></Button>
          </form>
        </div>
      </div>
    </div >
  );
}
