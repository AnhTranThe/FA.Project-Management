import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "../../../layout/context/layoutcontext";
import { getListUserService } from "../../../serviceApi/userServiceApi";

const LoginPage = () => {
  const [detailLogin, setDetailLogin] = useState({ Name: "", Email: "" });
  const [checked, setChecked] = useState(false);
  const [ListUser, setListUsser] = useState<IUserListModel[]>([]);
  const { layoutConfig } = useContext(LayoutContext);

  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const showWarning = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Warning",
      detail: "Email or Name Error",
      life: 3000,
    });
  };

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "WellCome!!",
      life: 3000,
    });
  };
  useEffect(() => {
    (async () => {
      const userData: IUserListModel[] = await getListUserService();
      setListUsser(userData);
    })();
  }, []);
  const handleLogin = () => {
    if (ListUser && ListUser?.length > 0) {
      const LoginSuccess = ListUser.filter((ele: IUserListModel) => {
        return ele.Name === detailLogin.Name && ele.Email === detailLogin.Email;
      });
      console.log(LoginSuccess);
      if (LoginSuccess.length > 0) {
        localStorage.setItem("user", JSON.stringify(LoginSuccess[0]));
        showSuccess();
        navigate("/dashboard");
      }
      showWarning();
    }
  };
  const handleChangeDetailUser = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailLogin((pre) => {
      return { ...pre, [event.target.id]: event.target.value };
    });
  };

  return (
    <div className="flex flex-column align-items-center justify-content-center">
      <Toast ref={toast} position="top-left" />
      {/* <img
        src={`/layout/images/logo-${
          layoutConfig.colorScheme === "light" ? "dark" : "white"
        }.svg`}
        alt="Sakai logo"
        className="mb-5 w-6rem flex-shrink-0"
      /> */}
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
            {/* <img
              src={`/demo/images/login/avatar.png`}
              alt="Image"
              height="50"
              className="mb-3"
            /> */}
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
