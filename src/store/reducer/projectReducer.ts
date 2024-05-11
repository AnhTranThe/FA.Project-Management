/* eslint-disable @typescript-eslint/no-explicit-any */

import { IProjectModel } from "../../models/projectModel";
import {
  CREATE_PROJECT,
  DELETE_PROJECT,
  GET_PROJECT_ALL,
  GET_PROJECT_BY_ID,
  SELECTED_PROJECT,
  UPDATE_ALL_PROJECT,
  UPDATE_PROJECT,
} from "../type/actionType";

export interface IProjectResponseModel {
  data: IProjectModel[];
  selectedProject: IProjectModel | null;
}
const initialState: IProjectResponseModel = {
  data: [],
  selectedProject: null,
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
    case SELECTED_PROJECT: {
      return { ...state, selectedProject: payload };
    }
    case UPDATE_ALL_PROJECT: {
      return { ...state, data: payload };
    }
    default:
      return state;
  }
};
export default projectReducer;
