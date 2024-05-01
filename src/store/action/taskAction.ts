import { ITaskModel } from "../../models/taskModel";
import axiosInstance from "../../Services/configAxiosService";
import { AppDispatch } from "../store";
import {
  CREATE_TASK,
  DELETE_TASK,
  GET_TASK_ALL,
  GET_TASK_BY_PROJECT_ID,
  UPDATE_TASK,
} from "../type/actionType";

export const getTaskAll = () => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosInstance.get("/task");
    if (res) {
      dispatch({
        type: GET_TASK_ALL,
        payload: res.data,
      });
    }
  } catch (e) {
    console.error("Error get task all:", e);
  }
};
export const getTasksByProject =
  (projectId: string) => async (dispatch: AppDispatch) => {
    try {
      const res = await axiosInstance.get(`/gettaskbyprojectid/${projectId}`);
      console.log(res);

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

export const createTask =
  (TaskData: ITaskModel) => async (dispatch: AppDispatch) => {
    try {
      const res = await axiosInstance.post("/task", TaskData);
      if (res.status === 201) {
        // Assuming the response contains the newly created Task data
        dispatch({
          type: CREATE_TASK,
          payload: res.data,
        });
        return { success: true, task: TaskData };
      }
    } catch (error) {
      // Handle error, maybe dispatch an error action
      console.error("Error creating Task:", error);
      return { success: false, error };
    }
  };

export const updateTask =
  (updatedTaskData: ITaskModel) => async (dispatch: AppDispatch) => {
    try {
      const res = await axiosInstance.put("/task", updatedTaskData);

      if (res.status === 200) {
        dispatch({
          type: UPDATE_TASK,
          payload: res.data, // Assuming the response contains the updated Task data
        });
        return { success: true, task: updatedTaskData };
      }
    } catch (error) {
      console.error("Error updating Task:", error);
      return { success: false, error };
    }
  };

export const deleteTask = (id: string) => async (dispatch: AppDispatch) => {
  try {
    // Perform the delete operation using Axios or any other HTTP client
    const res = await axiosInstance.delete("/task", { data: { id: id } });
    dispatch({
      type: DELETE_TASK,
      payload: res.data, // Pass the ID of the deleted Task as payload
    });
    return { success: true };
  } catch (error) {
    // Handle error, maybe dispatch an error action
    console.error("Error deleting Task:", error);
    return { success: false };
  }
};
