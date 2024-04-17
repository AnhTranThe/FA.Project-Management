import axios from "axios";
import { AppDispatch } from "../store";
import { GET_PROJECT_ALL } from "../type/projectType";

export const getProjectAll = () => async (dispatch: AppDispatch) => {
  const res = await axios.get(`http://127.0.0.1:1880/project`);
  if (res) {
    dispatch({
      type: GET_PROJECT_ALL,
      payload: res.data,
    });
  }
};

export const deleteProject = (id: number) => async (dispatch: AppDispatch) => {
  // Perform the delete operation using Axios or any other HTTP client
  const res = await axios.delete(`http://127.0.0.1:1880/project/${id}`);
  if (res) {
    dispatch(getProjectAll());
  }
};
