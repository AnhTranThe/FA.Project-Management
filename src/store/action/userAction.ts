import { AppDispatch } from "../../hooks/ReduxHook";
import { IUserModel } from "../../models/userModel";
import { GET_LIST_USER } from "../type/userType";

export const getListUserAction = (listUser: IUserModel[]) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_LIST_USER,
      payload: listUser,
    });
  };
};
