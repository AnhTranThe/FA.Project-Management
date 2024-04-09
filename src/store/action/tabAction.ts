import { SET_ACTIVE_TAB } from "../type/actionType";

export const setActiveTab = (tabName: string) => ({
  type: SET_ACTIVE_TAB,
  payload: tabName,
});
