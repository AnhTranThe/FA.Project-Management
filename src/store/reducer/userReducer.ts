import { actionPayload } from "../../models/actionPayloadModel";
import { IUserModel } from "../../models/userModel";
import { GET_USER_ALL, GET_USER_EMAIL } from "../type/actionType";

interface IInitialState {
  listUser: IUserModel[] | [];
  loginUserEmail: string;
}
const initialState: IInitialState = {
  listUser: [],
  loginUserEmail: "",
};
const userReducer = (
  state = initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { type, payload }: actionPayload<IUserModel[]>
) => {
  switch (type) {
    case GET_USER_ALL: {
      return {
        ...state,
        listUser: payload,
      };
    }
    case GET_USER_EMAIL: {
      return {
        ...state,
        loginUserEmail: payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
