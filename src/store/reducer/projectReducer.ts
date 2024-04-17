/* eslint-disable @typescript-eslint/no-explicit-any */

import { IProjectModel } from "../../models/projectModel";
import {
  CREATE_PROJECT,
  DELETE_PROJECT,
  GET_PROJECT_ALL,
  GET_PROJECT_BY_ID,
  UPDATE_PROJECT,
} from "../type/actionType";

const emptyProject: IProjectModel = {
  id: "",
  name: "",
  payment: "",
  time_start: "",
  time_end: "",
  note: "",
  priority: 0,
};
export interface IProjectResponseModel {
  data: IProjectModel[];
  selectedProject: IProjectModel;
}
const initialState: IProjectResponseModel = {
  data: [],
  selectedProject: emptyProject,
};
const projectReducer = (
  state: IProjectResponseModel = initialState,
  { type, payload }: any
) => {
  switch (type) {
    case GET_PROJECT_ALL:
      return { ...state, data: payload };
    case GET_PROJECT_BY_ID:
      return { ...state, selectedProject: payload };

    case CREATE_PROJECT:
      return { ...state, data: [...state.data, payload] };
    case UPDATE_PROJECT: {
      const updatedData = state.data.map((ele) => {
        if (ele.id === payload.id) {
          return payload;
        } else {
          return ele;
        }
      });
      return { ...state, data: updatedData };
    }
    case DELETE_PROJECT: {
      const filteredData = state.data.filter((ele) => ele.id !== payload.id);
      return { ...state, data: filteredData };
    }
    default:
      return state;
  }
};
export default projectReducer;