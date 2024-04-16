import { SET_THEME } from "../type/actionType";

export const setTheme = (IsDarkTheme: boolean) => ({
  type: SET_THEME,
  payload: {
    IsDarkTheme,
  },
});
