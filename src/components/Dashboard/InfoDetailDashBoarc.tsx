import { Button } from "primereact/button";
import { ActionCreator } from "redux";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

interface IProp<T> {
  label: string;
  count: number;
  listDetail?: T;
  action: ActionCreator<any>;
  to: string;
}

export default function InfoDetailDashBoarc<T>({
  count,
  label,
  action,
  listDetail,
  to,
}: IProp<T>) {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const hanldeDishpatch = () => {
    dispatch(action(listDetail));
    nav(`/dashboard/${to}`);
  };

  return (
    <div className="flex align-items-center">
      <span className="text-green-500 font-medium mr-2"> {count} </span>
      <span className="text-500">{label}</span>
      <Button link label="detail" onClick={hanldeDishpatch} />
    </div>
  );
}
