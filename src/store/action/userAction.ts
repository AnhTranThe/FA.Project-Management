import { AppDispatch } from "../../hooks/ReduxHook";
import { IUserListModel } from "../../models/userListModel";
import { GET_LIST_USER } from "../type/userType";

export const getListUserAction = (listUser: IUserListModel[]) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_LIST_USER,
      payload: listUser,
    });
  };
};
