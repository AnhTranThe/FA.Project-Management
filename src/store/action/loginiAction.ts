import { AppDispatch } from "../../hooks/ReduxHook";
import { IUserListModel } from "../../models/userModel";
import { LOGIN_TYPE, LOGOUT_TYPE } from "../type/loginType";

export const loginAction = (detailuser: IUserListModel) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: LOGIN_TYPE,
      payload: detailuser,
    });
  };
};

export const logoutAction = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: LOGOUT_TYPE,
      payload: null,
    });
  };
};
