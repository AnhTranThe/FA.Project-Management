import { ITaskModel } from "../../models/taskModel";
import axiosInstance from "../../Services/configAxiosService";
import { AppDispatch } from "../store";
import {
  GET_TASK_BY_PROJECT_ID,
  UPDATE_TASK_BY_PROJECT,
} from "../type/actionType";
import { GET_LIST_TASK } from "../type/taskType";

export const getTasksByProject =
  (projectId: string) => async (dispatch: AppDispatch) => {
    try {
      const res = await axiosInstance.get(`/gettaskbyprojectid/${projectId}`);
      if (res) {
        dispatch({
          type: GET_TASK_BY_PROJECT_ID,
          payload: res.data,
        });
      }
    } catch (e) {
      console.error("Error get Tasks By Project:", e);
    }
  };

export const updateTasksByProject =
  (data: ITaskModel) => async (dispatch: AppDispatch) => {
    try {
      const res = await axiosInstance.put("/task", data);
      if (res) {
        dispatch({
          type: UPDATE_TASK_BY_PROJECT,
          payload: res.data,
        });
      }
    } catch (e) {
      console.error("Error update Tasks By Project:", e);
    }
  };
export const updateListTaskAction =
  (listTask: ITaskModel[]) => (dispatch: AppDispatch) => {
    dispatch({
      type: GET_LIST_TASK,
      payload: listTask,
    });
  };
