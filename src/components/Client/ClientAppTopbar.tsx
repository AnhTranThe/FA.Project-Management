/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrimeReactContext } from "primereact/api";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/ReduxHook";
import { IMenuItem } from "../../models/commonModel";
import { LayoutContext } from "../../pages/context/layoutcontext";
import { setTheme } from "../../store/action/themeAction";
import { IThemeReducer } from "../../store/reducer/themeReducer";
import { useAppDispatch } from "../../store/store";
import { LayoutConfig } from "../../types/layout";
import { IUserLogInInfoModel } from "../../models/userModel";

export default function ClientAppTopbar() {
  const dispatch = useAppDispatch();
  const { IsDarkTheme } = useAppSelector(
    (state: IThemeReducer) => state.themeReducer
  );
  const { userLoginInfo }: { userLoginInfo: IUserLogInInfoModel } =
    useAppSelector((state) => state.userReducer);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { layoutConfig, setLayoutConfig } = useContext(LayoutContext);
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
  const menuRef = useRef<Menu>(null);
  const nav = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("Token");
    nav("/auth/login");
  };
  const handleProfileButtonClick = (event: any) => {
    setProfileDropdownOpen(!profileDropdownOpen);
    menuRef.current?.toggle(event);
  };
  const itemLeft: IMenuItem[] = [
    {
      label: "Jira",
      icon: "/imgs/logo.png",
      command: () => {
        nav("/client/projects");
      },
      class: `h-2rem border-none ${!IsDarkTheme ? "p-button-light" : "p-button-dark"
        }`,
    },
  ];

  const itemRights: IMenuItem[] = [
    {
      label: "Github",
      icon: "/imgs/github-mark.png",
      class: `circle-button ${!IsDarkTheme ? "p-button-light" : ""}`,
      command: () => {
        window.open(
          "https://github.com/AnhTranThe/FA.Project-Management",
          "_blank"
        );
      },
    },
    {
      class: `circle-button  pi ${!IsDarkTheme ? "pi-sun p-button-light" : "pi-sun p-button-dark"
        }`,
      command: () => {
        dispatch(setTheme(!IsDarkTheme));
      },
    },
    {
      class: `circle-button  pi ${!IsDarkTheme ? "pi-user p-button-light" : "pi-user p-button-dark"
        }`,
      command: handleProfileButtonClick,
      items: [
        {
          label: "Log out",
          icon: "pi pi-fw pi-sign-out",
        },
      ],
    },
  ];
  const profileMenuItems: MenuItem[] = [
    {
      template: () => {
        return (
          <div className="flex justify-content-center align-items-center text-xl  p-3" >
            <Avatar
              image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
              size="xlarge"
              className="mr-2"
              shape="circle"
            />
            <div
              className="flex flex-column align "
            >
              <span className="font-bold">{userLoginInfo.email}</span>
              <span className="text-sm">
                {userLoginInfo.role !== 1 ? "customer" : "admin"}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      template: () => {
        return (
          <Button
            onClick={() => nav("/client/user-service")} title="User Profile"
            className="w-full mt-3 "
            icon="pi pi-fw pi-cog"
            label="User Profile"
            severity="secondary"
          />
        );
      },
    },

    {
      template: () => {
        return (
          <Button
            onClick={handleLogout}
            className="w-full mt-3"
            icon="pi pi-fw pi-sign-out"
            label="Log out"
            severity="danger"
          />
        );
      },
    },
  ];
  return (
    <>
      <header className="flex z-5 relative w-full py-2 px-5  justify-content-between align-items-center shadow-3 surface-card  border-round-sm  align-items-center font-semibold">
        <div className="flex align-items-center">
          {itemLeft.map((item, index) => (
            <Button
              key={index}
              onClick={item.command}
              className={item.class}
              aria-label={item.label}>
              <img
                alt="logo"
                src="/imgs/logo.png"
                className="h-2rem"></img>
              <label className="text-xl pl-2">Jira</label>
            </Button>
          ))}
        </div>
        <div className="flex gap-3">
          {itemRights.map((item, index) => (
            <Button
              key={index}
              onClick={item.command}
              className={item.class}
              aria-label={item.label}
              severity="secondary">
              {item.icon && <img alt="logo" src={item.icon} className="icon" />}
              {item.label && (
                <label className="text-xl text-white">{item.label}</label>
              )}
            </Button>
          ))}

          <Menu
            className="w-auto p-3 mt-3 surface-card"
            style={{ boxShadow: "0 1px 10px #818CF8" }}
            model={profileMenuItems}
            popup
            ref={menuRef}
          />
        </div>
      </header>
    </>
  );
}
