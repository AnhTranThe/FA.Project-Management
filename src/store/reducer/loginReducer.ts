import { actionPayload } from "../../models/actionPayloadModel";
import { IUserListModel } from "../../models/userListModel";
import { LOGIN_TYPE } from "../type/loginType";

interface IInitialState {
  detailUser: IUserListModel | null;
}
const initialState: IInitialState = {
  detailUser: null,
};


const loginReducer = (
  state = initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { type, payload }: actionPayload<IUserListModel>
) => {
  switch (type) {
    case LOGIN_TYPE:
      return {
        ...state,
        detailUser: payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
