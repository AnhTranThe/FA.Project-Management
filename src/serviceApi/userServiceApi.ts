import axios from "axios";
import { ILoginDetail } from "../models/loginModel";
import axiosInstance from "./configAxiosService";
import { IUserModel } from "../models/userModel";

export const loginService = async (data: ILoginDetail) => {
  try {
    const res = await axios.post("http://localhost:8080/api/login", data);

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message);
  }
};

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
    let res = await axiosInstance.post("/user", data);
    return res.data;
  } catch (error: any) {
    let response = await error.response.data;
    return response;
  }
};

export const deleteUserService = async (id: string) => {
  try {
    let res = await axiosInstance.delete(`/user`, { data: { id } });
    return res.data;
  } catch (error: any) {
    let response = await error.response.data;
    return response;
  }
};
