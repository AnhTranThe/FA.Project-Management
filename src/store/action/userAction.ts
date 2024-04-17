import { AppDispatch } from "../../hooks/ReduxHook";
import { IUserModel } from "../../models/userModel";
import { GET_USER_ALL, GET_USER_EMAIL } from "../type/actionType";

export const getListUserAction = (listUser: IUserModel[]) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_USER_ALL,
      payload: listUser,
    });
  };
};
export const getUserEmailAction = (email: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_USER_EMAIL,
      payload: email,
    });
  };
};
