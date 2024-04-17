import { IProjectModel } from "../../models/projectModel";
import { DELETE_PROJECT, GET_PROJECT_ALL } from "../type/projectType";

export interface IProjectModelResponse {
  data: IProjectModel[];
}

const initialState: IProjectModelResponse = {
  data: [],
};

const projectReducer = (
  state: IProjectModelResponse = initialState,
  { type, payload }: any
) => {
  switch (type) {
    case GET_PROJECT_ALL:
      return { ...state, data: payload };
    case DELETE_PROJECT: {
      const filteredData = state.data.filter((ele) => ele.Id !== payload.id);
      return { ...state, data: filteredData };
    }
    default:
      return state;
  }
};
export default projectReducer;
