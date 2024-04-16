/* eslint-disable @typescript-eslint/no-explicit-any */

import { SET_THEME } from "../type/actionType";

export interface IThemeModelResponse {
  IsDarkTheme: boolean;
}

const initialState: IThemeModelResponse = {
  IsDarkTheme: false,
};
const themeReducer = (
  state: IThemeModelResponse = initialState,
  { type, payload }: any
) => {
  switch (type) {
    case SET_THEME: {
      return {
        ...state,
        IsDarkTheme: payload.IsDarkTheme,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
export default themeReducer;
