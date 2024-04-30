import { IProjectModel } from "../models/projectModel";
import axiosInstance from "./configAxiosService";

export const getProjectByUserService = async (email: string) => {
  try {
    const res = await axiosInstance.get(`/getprojectbyuser/${email}`);
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

export const getUserInProjectByIDService = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/user/GetUsersJoinInProject/${id}`);
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const addUserInProjectByIDService = async (
  id: string,
  data: { user_id: string; is_host: boolean }[]
) => {
  try {
    const res = await axiosInstance.post(`/project/add-user-in-project/${id}`, {
      arrSelectedUser: data,
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const deleteUserInprojectByIDService = async (
  id: string,
  user_id: string
) => {
  try {
    const res = await axiosInstance.delete(
      `/project/delete-user-in-project/${id}`,
      {
        data: { user_id },
      }
    );
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const changeHostInProjectService = async (data: {
  project_id: string;
  new_host_user_id: string;
}) => {
  try {
    const res = await axiosInstance.put(`/changeHostProject`, data);
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
