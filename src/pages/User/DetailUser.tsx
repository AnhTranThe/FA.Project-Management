import { InputText } from "primereact/inputtext";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/ReduxHook";
import { IUserListModel, IUserReducer } from "../../models/userListModel";

export default function DetailUser() {
  const [detailUserState, setdetailUserState] = useState<IUserListModel>();

  const param = useParams();
  const { listUser } = useAppSelector(
    (state: IUserReducer) => state.userReducer
  );
  useEffect(() => {
    if (param) {
      const data = listUser.filter((ele) => {
        return ele.Email === param.email;
      });
      setdetailUserState(data[0]);
    }
  }, [param]);
  const handleChangeDetailUser = (event: ChangeEvent<HTMLInputElement>) => {
    if (detailUserState) {
      setdetailUserState((pre) => {
        return { ...pre, [event.target.id]: event.target.value };
      });
    }
  };

  return (
    <div className="card">
      <h2 className="text-blue-600 mb-4">Detail User</h2>
      <label htmlFor="Name" className="block text-900 text-xl font-medium mb-2">
        Name
      </label>
      <InputText
        value={detailUserState?.Name}
        id="Name"
        type="text"
        placeholder="Name"
        className="w-full md:w-30rem mb-5"
        style={{ padding: "1rem" }}
        onChange={handleChangeDetailUser}
      />
      <label
        htmlFor="Email"
        className="block text-900 text-xl font-medium mb-2">
        Email
      </label>
      <InputText
        value={detailUserState?.Email}
        onChange={handleChangeDetailUser}
        id="Email"
        placeholder="Email address"
        className="w-full mb-5"
        data-pr-classname="w-full p-3 md:w-30rem"
      />
      <label htmlFor="Name" className="block text-900 text-xl font-medium mb-2">
        Role
      </label>
      <InputText
        value={detailUserState?.Role !== 1 ? "Admin" : "User"}
        id="Role"
        type="text"
        placeholder="Role"
        className="w-full md:w-30rem mb-5"
        style={{ padding: "1rem" }}
        onChange={handleChangeDetailUser}
      />
    </div>
  );
}
