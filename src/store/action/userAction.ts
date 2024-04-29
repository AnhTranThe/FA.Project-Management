import { AppDispatch } from "../../hooks/ReduxHook";
import axiosInstance from "../../Services/configAxiosService";
import {
  GET_USER_LOGIN_INFO,
  GET_USERS_J0IN_IN_PROJECT,
} from "../type/actionType";

export const getListUserJoinInProjectAction =
  (projectId: string) => async (dispatch: AppDispatch) => {
    const res = await axiosInstance.get(
      `/user/GetUsersJoinInProject/${projectId}`
    );

    if (res) {
      dispatch({
        type: GET_USERS_J0IN_IN_PROJECT,
        payload: res.data,
      });
    }
  };

export const getUserLoginInfo = (
  id: string,
  email: string,
  user_name: string,
  role: number
) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_USER_LOGIN_INFO,
      payload: { id, email, user_name, role },
    });
  };
};
