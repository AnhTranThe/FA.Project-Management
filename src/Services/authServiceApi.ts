import { ILoginDetail } from "../models/loginModel";
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
