import { actionPayload } from "../../models/actionPayloadModel";
import { IUserListModel } from "../../models/userModel";
import { GET_LIST_USER } from "../type/userType";

interface IInitialState {
  listUser: IUserListModel[] | [];
}
const initialState: IInitialState = {
  listUser: [],
};
const userReducer = (
  state = initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { type, payload }: actionPayload<IUserListModel[]>
) => {
  switch (type) {
    case GET_LIST_USER: {
      return {
        ...state,
        listUser: payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
