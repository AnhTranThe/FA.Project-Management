import { IProjectModel } from "../models/projectModel";
import axiosInstance from "./configAxiosService";

export const getProjectByUserService = async (email: string) => {
  try {
    const res = await axiosInstance.get(`/getprojectbyuser/${email}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getListProjectService = async () => {
  try {
    const res = await axiosInstance.get(`/project`);
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const createProjectService = async (data: IProjectModel) => {
  try {
    const res = await axiosInstance.post(`/project`, data);
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const updateProjectService = async (data: IProjectModel) => {
  try {
    const res = await axiosInstance.put(`/project`, data);
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const deleteProjectService = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/project`, { data: { id } });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
