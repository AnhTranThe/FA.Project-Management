/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IForgotPasswordModel,
  ILoginDetail,
  ISignUpModel,
} from "../models/loginModel";
import axiosInstance from "./configAxiosService";

export const loginService = async (data: ILoginDetail) => {
  try {
    const res = await axiosInstance.post("/login", data);
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const signUpService = async (data: ISignUpModel) => {
  try {
    const res = await axiosInstance.post("/register", data);
    return res.data;
  } catch (error: any) {
    console.log(error);

    return error.response.data;
  }
};

export const forgotPasswordService = async (data: IForgotPasswordModel) => {
  try {
    console.log(data);
    const res = await axiosInstance.put("/change-password", data);
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
