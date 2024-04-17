import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../Services/authServiceApi";
import { getUserEmailAction } from "../../store/action/userAction";
import { useAppDispatch } from "../../store/store";
import { IToastValueContext, ToastContext } from "../context/toastContext";

const LoginPage = () => {
  const [detailLogin, setDetailLogin] = useState({ email: "", password: "" });
  const [checked, setChecked] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const dispatch = useAppDispatch();


  const emailOpts = [{
    email: "admin@gmail.com"
  },
  {
    email: "test1@gmail.com"
  },
  {
    email: "test2@gmail.com"
  }]
  const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);



  // const { layoutConfig } = useContext(LayoutContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (detailLogin.email && detailLogin.password) {
      const data = await loginService(detailLogin);

      if (data) {
        dispatch(getUserEmailAction(detailLogin.email))
        localStorage.setItem("Token", JSON.stringify(data));
        if (data.role === 1) {
          navigate("/");
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
            severity: "warn",
            summary: "Warning",
            detail: "Name or Email not exsisted",
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

  // const handleChangeDetailUser = (event: ChangeEvent<HTMLInputElement>) => {
  //   setDetailLogin((pre) => {
  //     return { ...pre, [event.target.id]: event.target.value };
  //   });
  // };


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
            <label
              htmlFor="email"
              className="block text-900 text-xl font-medium mb-2">
              Email
            </label>

            <Dropdown value={selectedEmail}
              onChange={(e) => {
                const selectedEmailAddress = e.value.email; // Extract email address from the object
                setSelectedEmail(e.value); // Update selectedEmail state
                setDetailLogin((prev) => ({
                  ...prev,
                  email: selectedEmailAddress,
                  password: "Admin@123"
                }));

              }}
              options={emailOpts} optionLabel="email"
              placeholder="Select Email" className="w-full md:w-30rem mb-5" />
            {/* <InputText
              id="email"
              type="text"
              placeholder="email..."
              className="w-full md:w-30rem mb-5"
              style={{ padding: "1rem" }}
              onChange={handleChangeDetailUser}
            />
            <label
              htmlFor="password"
              className="block text-900 font-medium text-xl mb-2">
              Password
            </label>
            <InputText
              onChange={handleChangeDetailUser}
              id="password"
              placeholder="password..."
              className="w-full mb-5"
              data-pr-classname="w-full p-3 md:w-30rem"></InputText> */}

            <div className="flex align-items-center justify-content-between mb-5 gap-5">
              <div className="flex align-items-center">
                <Checkbox
                  inputId="rememberme1"
                  checked={checked}
                  onChange={(e) => setChecked(e.checked || false)}
                  className="mr-2"></Checkbox>
                <label htmlFor="rememberme1">Remember me</label>
              </div>
              <a
                className="font-medium no-underline ml-2 text-right cursor-pointer"
                style={{ color: "var(--primary-color)" }}>
                Forgot password?
              </a>
            </div>
            <div className="flex align-items-center mb-5 gap-2">
              <InputSwitch
                checked={switchValue}
                onChange={(e) => setSwitchValue(e.value)}
              />
              <label htmlFor="rememberme1">Switch dark/light</label>
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
