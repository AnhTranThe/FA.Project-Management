import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";

export default function ProjectListUsersJoin() {

  return (
    <>
      <AvatarGroup>
        <Avatar image="/images/avatar/amyelsner.png" size="large" shape="circle" />
        <Avatar image="/images/avatar/asiyajavayant.png" size="large" shape="circle" />
        <Avatar image="/images/avatar/onyamalimba.png" size="large" shape="circle" />
        <Avatar image="/images/avatar/ionibowcher.png" size="large" shape="circle" />
        <Avatar image="/images/avatar/xuxuefeng.png" size="large" shape="circle" />
        <Avatar label="+2" shape="circle" size="large" />
      </AvatarGroup>
    </>
  )
}
