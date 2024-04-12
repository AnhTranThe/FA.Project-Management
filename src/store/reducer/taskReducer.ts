/* eslint-disable @typescript-eslint/no-explicit-any */

import { ITaskModel } from "../../models/taskModel";
import {
  CREATE_TASK,
  DELETE_TASK,
  GET_TASK_ALL,
  UPDATE_TASK,
} from "../type/actionType";

export interface ITaskModelResponse {
  data: ITaskModel[];
}
const initialState: ITaskModelResponse = {
  data: [],
};
const taskReducer = (
  state: ITaskModelResponse = initialState,
  { type, payload }: any
) => {
  switch (type) {
    case GET_TASK_ALL:
      return { ...state, data: payload };
    case CREATE_TASK:
      return { ...state, data: [...state.data, payload] };
    case UPDATE_TASK: {
      const updatedData = state.data.map((ele) => {
        if (ele.Id === payload.id) {
          return payload;
        } else {
          return ele;
        }
      });
      return { ...state, data: updatedData };
    }
    case DELETE_TASK: {
      const filteredData = state.data.filter((ele) => ele.Id !== payload.id);
      return { ...state, data: filteredData };
    }
    default:
      return state;
  }
};
export default taskReducer;
