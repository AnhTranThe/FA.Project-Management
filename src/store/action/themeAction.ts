import { SET_THEME } from "../type/actionType";

export const setTheme = (theme: string) => ({
  type: SET_THEME,
  payload: theme,
});
