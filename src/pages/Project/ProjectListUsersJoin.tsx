import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";
import { useAppSelector } from "../../hooks/ReduxHook";
import { IUserModel } from "../../models/userModel";
import { generateRandomImageAvt } from "../../utils/Utilities";
import { useRef } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";

export default function ProjectListUsersJoin() {
  const { listUser }: { listUser: IUserModel[] } = useAppSelector((state) => state.userReducer);
  const maxAvatars = 3;
  const menuLeft = useRef<Menu>(null);
  const menuListUserJoinInProject: MenuItem[] = [
    {
      template: () => {
        return (
          <>
            {listUser.map((user, index) => (
              <div key={index} className="flex ">
                <div className="flex align-items-center gap-3 py-2">
                  <Avatar image={generateRandomImageAvt()} size="large" shape="circle" />
                  {user.email}
                </div>
              </div>
            ))}
          </>
        );
      }
    }
  ];

  return (
    <>
      <AvatarGroup>
        {listUser.slice(0, maxAvatars).map((user, index) => (
          <Avatar key={index} image={generateRandomImageAvt()} size="large" shape="circle" />
        ))}
        {listUser.length > maxAvatars && (
          <Avatar
            label={`+${listUser.length - maxAvatars}`}
            shape="circle"
            size="large"
            style={{ cursor: 'pointer' }}
            className="avatar-link surface-card"
            onClick={(event) => menuLeft.current?.toggle(event)}

          />

        )}

      </AvatarGroup>
      <Menu style={{ boxShadow: '0 1px 10px #818CF8' }} className="w-auto p-3 mt-3 surface-card   " model={menuListUserJoinInProject} popup ref={menuLeft} />
    </>
  )
}
