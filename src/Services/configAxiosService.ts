import axios from "axios";
// Tạo một instance Axios
const BASE_URL = process.env.BASE_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// Intercept REQUEST trước khi được gửi
axiosInstance.interceptors.request.use(
  (config) => {
    // Check hệ thống có token hay không và cập nhật Authorization header nếu có
    const token = sessionStorage.getItem("Token");
    if (token) {
      const parseToken = JSON.parse(token);
      config.headers.Authorization = "Bearer " + `${parseToken.refresh_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept RESPONSE khi được trả về
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check xem error trả về có phải là 401 Unauthorized không và đã thử làm mới token hay chưa ?
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Thực hiện gửi request để làm mới token
        // const currentToken = sessionStorage.getItem("refresh_token");
        const refeshToken = sessionStorage.getItem("Token");

        if (refeshToken) {
          const parseRefeshToken = JSON.parse(refeshToken);
          const response = await axios({
            method: "get",
            url: BASE_URL + "/refresh-token",
            headers: {
              Authorization: "Bearer " + `${parseRefeshToken.refresh_token}`,
            },
          });

          // Cập nhật token mới và gửi lại request gốc với token mới
          const newToken = response.data.refresh_token;
          parseRefeshToken.refresh_token = newToken;
          sessionStorage.setItem("Token", JSON.stringify(parseRefeshToken));
          originalRequest.headers.Authorization = "Bearer " + `${newToken}`;
          return axios(originalRequest);
        }
      } catch (error) {
        // Nếu không thể làm mới token, chuyển hướng đến trang đăng nhập hoặc xử lý lỗi khác
        // Ví dụ: window.location.href = '/login';
        console.log(error);
        window.location.href = "/api/login";
        sessionStorage.removeItem("Token");
        return Promise.reject(error);
      }
    }

    // Nếu không phải là lỗi 401 Unauthorized hoặc không thể làm mới token, trả về lỗi
    return Promise.reject(error);
  }
);

export default axiosInstance;
