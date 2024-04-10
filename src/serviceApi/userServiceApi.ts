import axios from "axios";

export const getListUserService = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:1880/user");

    // console.log(res.data);
    return res.data;
  } catch (error: any) {
    // console.log(error.message);
    return error.message;
  }
};
