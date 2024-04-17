/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrimeReactContext } from "primereact/api";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/ReduxHook";
import { IMenuItem } from "../models/commonModel";
import { LayoutContext } from "../pages/context/layoutcontext";
import { setTheme } from "../store/action/themeAction";
import { useAppDispatch } from "../store/store";
import { LayoutConfig } from "../types/layout";
import { IThemReducer } from "../store/reducer/themeReducer";

export default function HeaderClient() {
  const dispatch = useAppDispatch();
  const { IsDarkTheme } = useAppSelector(
    (state: IThemReducer) => state.themeReducer
  );

  console.log(IsDarkTheme);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { layoutConfig, setLayoutConfig } = useContext(LayoutContext);
  const { changeTheme } = useContext(PrimeReactContext);

  const _changeTheme = (theme: string, colorScheme: string) => {
    // changeTheme?.(layoutConfig.theme, theme, "theme-css", () => {
    //   setLayoutConfig((prevState: LayoutConfig) => ({
    //     ...prevState,
    //     theme,
    //     colorScheme,
    //   }));
    // });
    setLayoutConfig((prevState: LayoutConfig) => {
      return {
        ...prevState,
        theme,
        colorScheme,
      };
    });
  };
  console.log(layoutConfig);

  useEffect(() => {
    if (IsDarkTheme) {
      IsDarkTheme
        ? _changeTheme("lara-dark-indigo", "dark")
        : _changeTheme("lara-light-indigo", "light");
    }
  }, [IsDarkTheme]);

  const menuRef = useRef<Menu>(null);
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("Token");
    nav("/auth/login");
  };

  const handleProfileButtonClick = (event: any) => {
    setProfileDropdownOpen(!profileDropdownOpen);
    menuRef.current?.toggle(event);
  };

  const itemLeft: IMenuItem[] = [
    {
      label: "Jira",
      icon: "/public/imgs/logo.png",
      command: () => {
        nav("/client/projects");
      },
      class: "h-2rem p-button-light ",
    },
  ];

  const itemRights: IMenuItem[] = [
    {
      label: "Github",
      icon: "/public/imgs/github-mark.png",
      class: `circle-button ${!IsDarkTheme ? "p-button-light" : ""}`,
      command: () => {
        window.open(
          "https://github.com/AnhTranThe/FA.Project-Management",
          "_blank"
        );
      },
    },
    {
      class: `circle-button  pi ${
        !IsDarkTheme ? "pi-sun p-button-light" : "pi-sun p-button-dark"
      }`,
      command: () => {
        dispatch(setTheme(!IsDarkTheme));
      },
    },
    {
      class: `circle-button  pi ${
        !IsDarkTheme ? "pi-user p-button-light" : "pi-user p-button-dark"
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
  const profileMenuItems: IMenuItem[] = [
    {
      label: "Profile",
      icon: "pi pi-fw pi-user",
      command: handleProfileButtonClick,
      items: [
        {
          label: "Log out",
          icon: "pi pi-fw pi-sign-out",
          command: handleLogout,
        },
      ],
    },
  ];
  return (
    <>
      <header className="flex relative w-full py-2 px-5  justify-content-between align-items-center shadow-3 surface-card  border-round-sm  align-items-center font-semibold">
        <div className="flex align-items-center">
          {itemLeft.map((item, index) => (
            <Button
              key={index}
              onClick={item.command}
              className={item.class}
              aria-label={item.label}>
              <img
                alt="logo"
                src="/public/imgs/logo.png"
                className="h-2rem"></img>
              <label className="text-xl text-white">Jira</label>
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

          <Menu model={profileMenuItems} popup ref={menuRef} />
        </div>
      </header>
    </>
  );
}
