/* eslint-disable @typescript-eslint/no-explicit-any */

import { ITaskModel } from "../../models/taskModel";
import {
  CREATE_TASK,
  DELETE_TASK,
  GET_TASK_ALL,
  GET_TASK_BY_PROJECT_ID,
  UPDATE_TASK,
} from "../type/actionType";

export interface ITaskModelResponse {
  data: ITaskModel[];
  listTasksByProject: ITaskModel[];
}
const initialState: ITaskModelResponse = {
  data: [],
  listTasksByProject: [],
};
const taskReducer = (
  state: ITaskModelResponse = initialState,
  { type, payload }: any
) => {
  switch (type) {
    case GET_TASK_ALL:
      return { ...state, data: payload };
    case GET_TASK_BY_PROJECT_ID:
      return { ...state, listTasksByProject: payload };
    case CREATE_TASK:
      return {
        ...state,
        data: [...state.data, payload],
        listTasksByProject: [...state.data, payload],
      };
    case UPDATE_TASK: {
      const updatedData = state.data.map((ele) => {
        if (ele.id === payload.id) {
          return payload;
        } else {
          return ele;
        }
      });
      return {
        ...state,
        data: updatedData,
      };
    }
    case DELETE_TASK: {
      const filteredData = state.data.filter((ele) => ele.id !== payload.id);
      return { ...state, data: filteredData };
    }
    default:
      return state;
  }
};
export default taskReducer;
