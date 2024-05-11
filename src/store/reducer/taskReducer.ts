/* eslint-disable @typescript-eslint/no-explicit-any */

import { ITaskModel } from "../../models/taskModel";
import {
  GET_TASK_BY_PROJECT_ID,
  UPDATE_TASK_BY_PROJECT,
} from "../type/actionType";
import { GET_LIST_TASK } from "../type/taskType";

export interface ITaskModelResponse {
  listTasksByProject: ITaskModel[];
  listTaskService: ITaskModel[] | [];
}
const initialState: ITaskModelResponse = {
  listTasksByProject: [],
  listTaskService: [],
};
const taskReducer = (
  state: ITaskModelResponse = initialState,
  { type, payload }: any
) => {
  switch (type) {
    case GET_TASK_BY_PROJECT_ID: {
      return { ...state, listTasksByProject: payload };
    }
    case GET_LIST_TASK: {
      return { ...state, listTaskService: payload };
    }
    case UPDATE_TASK_BY_PROJECT: {
      const updatedData = state.listTasksByProject.map((ele) => {
        if (ele.id === payload.id) {
          return payload;
        } else {
          return ele;
        }
      });
      return { ...state, listTasksByProject: updatedData };
    }

    default:
      return state;
  }
};
export default taskReducer;
