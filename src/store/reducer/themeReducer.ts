/* eslint-disable @typescript-eslint/no-explicit-any */

import { SET_THEME } from "../type/actionType";

export interface IThemeModelResponse {
  theme: string;
}
const initialState: IThemeModelResponse = {
  theme: "default",
};

const themeReducer = (
  state: IThemeModelResponse = initialState,
  { type, payload }: any
) => {
  switch (type) {
    case SET_THEME: {
      return { ...state, theme: payload };
    }
    default:
      return state;
  }
};
export default themeReducer;
