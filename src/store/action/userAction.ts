import { AppDispatch } from "../../hooks/ReduxHook";
import { IUserModel } from "../../models/userModel";
import { GET_USER_ALL, GET_USER_LOGIN_INFO } from "../type/actionType";

export const getListUserAction = (listUser: IUserModel[]) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_USER_ALL,
      payload: listUser,
    });
  };
};
export const getUserLoginInfo = (id: string, email: string, role: number) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_USER_LOGIN_INFO,
      payload: { id, email, role },
    });
  };
};
