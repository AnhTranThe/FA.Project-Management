import { IProjectModel } from "../../models/projectModel";
import axiosInstance from "../../Services/configAxiosService";
import { AppDispatch } from "../store";
import {
  GET_PROJECT_ALL,
  SELECTED_PROJECT,
  UPDATE_ALL_PROJECT,
} from "../type/actionType";

export const getProjectAll = () => async (dispatch: AppDispatch) => {
  const res = await axiosInstance.get("/project");
  if (res) {
    dispatch({
      type: GET_PROJECT_ALL,
      payload: res.data,
    });
  }
};
export const selectedProjectItem =
  (project: IProjectModel) => async (dispatch: AppDispatch) => {
    dispatch({
      type: SELECTED_PROJECT,
      payload: project,
    });
  };

export const updateListProjectAction =
  (listProject: IProjectModel[]) => (dispatch: AppDispatch) => {
    dispatch({
      type: UPDATE_ALL_PROJECT,
      payload: listProject,
    });
  };
