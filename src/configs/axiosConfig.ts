import axios from "axios";

export const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

axiosClient.interceptors.request.use(
  (config) => {
    if (typeof localStorage !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // const originalRequest = error.config;

    // if (
    //   error?.response.status === 404 ||
    //   error.response.status === 400 ||
    //   error.response.status === 422 ||
    //   error.response.status === 413
    // ) {
    //   toast.error(
    //     error?.response?.data?.data?.message ?? "خطا در انحام عملیات",
    //     { rtl: true }
    //   );
    // }

    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;

    //   if (typeof localStorage !== "undefined") {
    //     const refreshToken = localStorage.getItem("refreshToken");
    //     if (!refreshToken) {
    //       window.location.href = "/login";
    //       localStorage.clear();
    //       return Promise.reject(error);
    //     }

    //     axiosClient
    //       .post("/refresh-token", {
    //         token: refreshToken,
    //       })
    //       .then((response) => {
    //         localStorage.setItem("token", response.data?.data?.access_token);
    //         localStorage.setItem(
    //           "refreshToken",
    //           response.data?.data?.refresh_token
    //         );

    //         originalRequest.headers.Authorization = `Bearer ${response.data?.data?.access_token}`;

    //         originalRequest._retry = false;
    //         return axios(originalRequest);
    //       })
    //       .catch(() => {
    //         window.location.href = "/login";
    //         localStorage.clear();
    //       });
    //   }
    // }

    return Promise.reject(error);
  }
);
