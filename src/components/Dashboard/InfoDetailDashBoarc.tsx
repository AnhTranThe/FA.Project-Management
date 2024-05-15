import { Button } from "primereact/button";
import { ActionCreator } from "redux";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { ITaskModel } from "../../models/taskModel";
import { IProjectModel } from "../../models/projectModel";
import { IUserListModel } from "../../models/userListModel";

interface IProp {
  label: string;
  count: number;
  listDetail?: ITaskModel[] | IProjectModel[] | IUserListModel[];
  action: ActionCreator<any>;
  to: string;
}

export default function InfoDetailDashBoarc({
  count,
  label,
  action,
  listDetail,
  to,
}: IProp) {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const hanldeDishpatch = () => {
    dispatch(action(listDetail));
    nav(`${to}`);
  };

  return (
    <div className="flex align-items-center">
      <span className="text-green-500 font-medium mr-2"> {count} </span>
      <span className="text-500">{label}</span>
      <Button link label="detail" onClick={hanldeDishpatch} />
    </div>
  );
}
