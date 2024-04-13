import axios from "axios";
import { IUserListModel } from "../models/userModel";

export const getListUserService = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:1880/user");

    // console.log(res.data);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleteUserService = async (email: string) => {
  try {
    const res = await axios.delete("http://127.0.0.1:1880/user", {
      data: email,
    });

    // console.log(res.data);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message);
  }
};

export const updateUserService = async (detailUser: IUserListModel) => {
  try {
    const res = await axios.put("http://127.0.0.1:1880/user", {
      data: detailUser,
    });

    // console.log(res.data);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message);
  }
};
