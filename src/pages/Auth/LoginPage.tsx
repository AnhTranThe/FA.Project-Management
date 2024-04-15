import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { InputSwitch } from "primereact/inputswitch";
import { IUserListModel } from "../../models/userModel";
import { getListUserService } from "../../serviceApi/userServiceApi";
import { loginAction } from "../../store/action/loginiAction";
import { useAppDispatch } from "../../store/store";
import { IToastValueContext, ToastContext } from "../context/toastContext";

const LoginPage = () => {
  const [detailLogin, setDetailLogin] = useState({ Name: "", Email: "" });
  const [checked, setChecked] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [ListUser, setListUsser] = useState<IUserListModel[]>([]);
  const dispatch = useAppDispatch();
  const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);

  // const { layoutConfig } = useContext(LayoutContext);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const userData: IUserListModel[] = await getListUserService();
      setListUsser(userData);
    })();
  }, []);

  const handleLogin = async () => {
    if (ListUser && ListUser?.length > 0) {
      const LoginSuccess = ListUser.filter((ele: IUserListModel) => {
        return ele.Name === detailLogin.Name && ele.Email === detailLogin.Email;
      });
      if (LoginSuccess.length > 0) {
        await dispatch(loginAction(LoginSuccess[0]));
        if (LoginSuccess[0].Role === 1) {
          navigate("/");
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
          navigate("/client/projects");
          setShowModelToast((pre) => {
            return {
              ...pre,
              severity: "success",
              summary: "Success",
              detail: "Login Success",
            };
          });
          return;
        }
      }
      setShowModelToast((pre) => {
        return {
          ...pre,
          severity: "warn",
          summary: "Warning",
          detail: "Name or Emaill not exsisted",
        };
      });
    }
  };
  const handleChangeDetailUser = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailLogin((pre) => {
      return { ...pre, [event.target.id]: event.target.value };
    });
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
            <label
              htmlFor="Name"
              className="block text-900 text-xl font-medium mb-2">
              Name
            </label>
            <InputText
              value={detailLogin.Name}
              id="Name"
              type="text"
              placeholder="Name"
              className="w-full md:w-30rem mb-5"
              style={{ padding: "1rem" }}
              onChange={handleChangeDetailUser}
            />

            <label
              htmlFor="Email"
              className="block text-900 font-medium text-xl mb-2">
              Email
            </label>
            <InputText
              value={detailLogin.Email}
              onChange={handleChangeDetailUser}
              id="Email"
              placeholder="Email address"
              className="w-full mb-5"
              data-pr-classname="w-full p-3 md:w-30rem"></InputText>

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
