import { actionPayload } from "../../models/actionPayloadModel";
import { IUserModel } from "../../models/userModel";
import {
  GET_LIST_DETAIL_USER_SERVICE,
  GET_USER_LOGIN_INFO,
  GET_USERS_J0IN_IN_PROJECT,
} from "../type/actionType";
import { IUserLogInInfoModel } from "./../../models/userModel";

interface IInitialState {
  listUser: IUserModel[] | [];
  userLoginInfo: IUserLogInInfoModel;
  listDetailUser: IUserModel[] | [];
}

const emptyUserLogInInfo: IUserLogInInfoModel = {
  id: "",
  email: "",
  role: 0,
  user_name: "",
};

const initialState: IInitialState = {
  listUser: [],
  userLoginInfo: emptyUserLogInInfo,
  listDetailUser: [],
};
const userReducer = (
  state = initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { type, payload }: actionPayload<IUserModel[]>
) => {
  switch (type) {
    case GET_USERS_J0IN_IN_PROJECT: {
      return {
        ...state,
        listUser: payload,
      };
    }
    case GET_USER_LOGIN_INFO: {
      return {
        ...state,
        userLoginInfo: payload,
      };
    }
    case GET_LIST_DETAIL_USER_SERVICE: {
      return {
        ...state,
        listDetailUser: payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
