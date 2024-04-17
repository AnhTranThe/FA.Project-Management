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
