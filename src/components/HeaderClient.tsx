/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMenuItem } from "../models/commonModel";
import { logoutAction } from "../store/action/loginiAction";
import { useAppDispatch } from "../store/store";

export default function HeaderClient() {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const menuRef = useRef<Menu>(null);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const handleLogout = () => {
    dispatch(logoutAction());
    nav("/auth/login");
  };
  const handleProfileButtonClick = (event: any) => {
    setProfileDropdownOpen(!profileDropdownOpen);
    menuRef.current?.toggle(event);
  };
  const itemLeft: IMenuItem[] = [
    {
      label: 'Jira',
      icon: '/public/imgs/logo.png',
      command: () => {
        nav("/client/projects")
      },
      class: "h-2rem p-button-white "
    }
  ];

  const itemRights: IMenuItem[] = [
    {
      label: 'Github',
      icon: '/public/imgs/github-mark.png',
      class: "circle-button",
      command: () => {
        window.open("https://github.com/AnhTranThe/FA.Project-Management", "_blank");
      }

    },
    {
      class: "circle-button  pi pi-moon",

    },
    {
      label: 'Profile',
      icon: 'https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp',
      class: "circle-button",
      command: handleProfileButtonClick,

      items: [
        {
          label: "Log out",
          icon: 'pi pi-fw pi-sign-out'
        }
      ]
    }
  ];
  const profileMenuItems: IMenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-fw pi-user',
      command: handleProfileButtonClick,
      items: [
        {
          label: 'Log out',
          icon: 'pi pi-fw pi-sign-out',
          command: handleLogout

          ,
        },
      ],
    },
  ];


  return (
    <>

      <header className="flex relative w-full py-2 px-5  justify-content-between align-items-center shadow-3 surface-card  border-round-sm  align-items-center font-semibold">
        <div className="flex align-items-center">
          {itemLeft.map((item, index) => (
            <Button key={index} onClick={item.command} className={item.class} aria-label={item.label}>
              <img alt="logo" src="/public/imgs/logo.png" className="h-2rem"></img>
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
              severity="secondary"
              aria-label={item.label}

            >
              {
                item.icon && <img alt="logo" src={item.icon} className="icon" />

              }
              {
                item.label && <label className="text-xl text-white">{item.label}</label>
              }


            </Button>
          ))}

          <Menu model={profileMenuItems} popup ref={menuRef} />
        </div>
      </header>

    </>

  );

}

