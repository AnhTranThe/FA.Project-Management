/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITaskModel } from "../models/taskModel";
import axiosInstance from "./configAxiosService";

export const getListTaskService = async () => {
  try {
    const res = await axiosInstance.get("/task");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getListTaskByProjectService = async (projectId: string) => {
  try {
    const res = await axiosInstance.get(`/gettaskbyprojectid/${projectId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createNewTaskService = async (data: ITaskModel) => {
  try {
    const res = await axiosInstance.post("/task", data);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateTaskService = async (data: ITaskModel) => {
  try {
    const res = await axiosInstance.put("/task", data);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const deteleTaskService = async (id: string) => {
  try {
    const res = await axiosInstance.delete("/task", { data: { id: id } });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
