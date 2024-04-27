import { ILoginDetail, ISignUpModel } from "../models/loginModel";
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
