import axios from "axios";
import { AppDispatch } from "../store";
import { ITaskModel } from "../../models/taskModel";
import {
  CREATE_TASK,
  DELETE_TASK,
  GET_TASK_ALL,
  UPDATE_TASK,
} from "../type/actionType";

export const getTaskAll = () => async (dispatch: AppDispatch) => {
  const res = await axios.get(`http://127.0.0.1:1880/task`);
  if (res) {
    dispatch({
      type: GET_TASK_ALL,
      payload: res.data,
    });
  }
};
export const createTask =
  (TaskData: ITaskModel) => async (dispatch: AppDispatch) => {
    try {
      const res = await axios.post("http://127.0.0.1:1880/task", TaskData);

      if (res.status === 201) {
        // Assuming the response contains the newly created Task data
        dispatch({
          type: CREATE_TASK,
          payload: res.data,
        });
      }
    } catch (error) {
      // Handle error, maybe dispatch an error action
      console.error("Error creating Task:", error);
    }
  };
export const updateTask =
  (updatedTaskData: ITaskModel) => async (dispatch: AppDispatch) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:1880/task/`,
        updatedTaskData
      );

      if (res.status === 200) {
        dispatch({
          type: UPDATE_TASK,
          payload: res.data, // Assuming the response contains the updated Task data
        });
      }
    } catch (error) {
      console.error("Error updating Task:", error);
    }
  };
export const deleteTask = (id: number) => async (dispatch: AppDispatch) => {
  try {
    // Perform the delete operation using Axios or any other HTTP client
    await axios.delete(`http://127.0.0.1:1880/task/`);
    dispatch({
      type: DELETE_TASK,
      payload: id, // Pass the ID of the deleted Task as payload
    });
  } catch (error) {
    // Handle error, maybe dispatch an error action
    console.error("Error deleting Task:", error);
  }
};
