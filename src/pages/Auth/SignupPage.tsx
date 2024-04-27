import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { signUpService } from "../../Services/authServiceApi";
import { ISignUpModel } from "../../models/loginModel";
import { IToastValueContext, ToastContext } from "../context/toastContext";

export default function SignupPage() {
  const [switchValue, setSwitchValue] = useState(false);
  const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);

  const handleSignUp = async (detaiSignUp: ISignUpModel) => {
    const res = await signUpService(detaiSignUp);
    if (res && res.code === 200) {
      setShowModelToast({
        severity: "success",
        summary: "Success",
        detail: "Sign Up Success",
      });
    } else {
      setShowModelToast({
        severity: "warn",
        summary: "Warning",
        detail: `${res?.message || "Something Wrong"}`,
      });
    }
  };

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      role: 0,
    },
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
                htmlFor="email"
                className="block text-900 text-sm ml-1 font-medium mb-2">
                Email
              </label>

              <InputText
                id="email"
                type="email"
                required
                placeholder="email..."
                className="w-full md:w-30rem"
                style={{ padding: "1rem" }}
                defaultValue={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="item-form mb-3">
              <label
                htmlFor="password"
                className="block text-900 font-medium text-sm ml-1 mb-2">
                Password
              </label>
              <InputText
                id="password"
                placeholder="password..."
                required
                className="w-full"
                data-pr-classname="w-full p-3 md:w-30rem"
                defaultValue={values.password}
                onChange={handleChange}
                onBlur={handleBlur}></InputText>
            </div>
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
            </div>
            <div className="item-form mb-3">
              <label
                htmlFor="role"
                className="block text-900 font-medium text-sm ml-1 mb-2">
                Role
              </label>
              <input
                type="number"
                id="role"
                placeholder="role..."
                required
                className="p-inputtext p-component p-filled w-full"
                data-pr-classname="w-full p-3 md:w-30rem"
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="flex align-items-center justify-content-between mb-5 gap-2">
              <div className="flex align-items-center">
                <InputSwitch
                  checked={switchValue}
                  onChange={(e) => setSwitchValue(e.value)}
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
    </div>
  );
}
