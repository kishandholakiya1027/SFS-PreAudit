import axios from "axios";
import { jwtDecode } from "jwt-decode";

const requestQueue = [];
let isRefreshing = false;

export const api = (url, method, data = null, isFormData = null) => {
  const port = import.meta.env.REACT_APP_PORT || "http://localhost:5001";
  // const port = import.meta.env.REACT_APP_PORT || "http://89.116.21.113:5001";
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const Instanse = axios.create({
    baseURL: `${port}/v1/api`,
  });
  const config = {
    url,
    method,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (isFormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }

  Instanse.interceptors.request.use(
    async function (config) {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
      const deviceid = JSON.parse(localStorage.getItem("deviceid"));
      if (accessToken && refreshToken) {
        const user = jwtDecode(accessToken);
        const isExpired = user.exp && user.exp < Date.now() / 1000;
        if (isExpired) {
          if (!isRefreshing) {
            isRefreshing = true;
            try {
              const response = await axios.post(
                `${port}/v1/api/admin/regenerate_token`,
                { deviceid: deviceid },
                {
                  headers: {
                    authorization: `${refreshToken}`,
                  },
                }
              );
              localStorage.setItem(
                "accessToken",
                JSON.stringify(response.data.data.accessToken)
              );
              localStorage.setItem(
                "refreshToken",
                JSON.stringify(response.data.data.refreshToken)
              );
              localStorage.setItem(
                "deviceid",
                JSON.stringify(response.data.data.deviceid)
              );

              config.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
              requestQueue.forEach((queuedConfig) => {
                queuedConfig.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
                Instanse.request(queuedConfig);
              });
              requestQueue.length = 0;
            } catch (error) {
              return Promise.reject(error);
            } finally {
              isRefreshing = false;
            }
          } else {
            requestQueue.push(config);
            return new Promise(() => {});
          }
        }
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  Instanse.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const err = {
        message: error?.response?.data?.message || error?.message,
        status: error?.response?.status || error?.status,
      };

      if (err) {
        return Promise.reject(err);
      }

      const { status } = error.response;
      if (status === 403) {
        requestQueue.push(config);
      }
      return Promise.reject(error);
    }
  );
  return Instanse.request(config);
};
