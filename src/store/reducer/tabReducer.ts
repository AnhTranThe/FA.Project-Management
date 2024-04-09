import { SET_ACTIVE_TAB } from "../type/actionType";

const initialState = {
  activeTab: "home",
};
const tabReducer = (
  state = initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { type, payload }: any
) => {
  switch (type) {
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: payload,
      };
    default:
      return state;
  }
};

export default tabReducer;
