/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserModel } from "../models/userModel";
import axiosInstance from "./configAxiosService";

export const getListUserService = async () => {
  try {
    const res = await axiosInstance.get("/user");
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const createNewUserService = async (data: IUserModel) => {
  try {
    const res = await axiosInstance.post("/user", data);
    return res.data;
  } catch (error: any) {
    const response = await error.response.data;
    return response;
  }
};

export const deleteUserService = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/user`, { data: { id } });
    return res.data;
  } catch (error: any) {
    const response = await error.response.data;
    return response;
  }
};
