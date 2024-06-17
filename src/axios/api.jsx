import axios from "axios";
import { jwtDecode } from "jwt-decode";

const requestQueue = [];
let isRefreshing = false;

const regenerateToken = async () => {
  const port = import.meta.env.VITE_APP_PORT;
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  const deviceid = JSON.parse(localStorage.getItem("deviceid"));

  try {
    const response = await axios.post(
      `${port}/v1/api/user/regenerate_token`,
      { deviceid },
      {
        headers: {
          Authorization: `${refreshToken}`,
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

    return response.data.data.accessToken;
  } catch (error) {
    localStorage.clear();
    window.location.href = "/login";
    throw error;
  }
};

const processQueue = (error, token = null) => {
  requestQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  requestQueue.length = 0;
};

export const api = (url, method, data = null, isFormData = null) => {
  const port = import.meta.env.VITE_APP_PORT;
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const instance = axios.create({
    baseURL: `${port}/v1/api`,
  });

  const config = {
    url: url.url ? url.url : url,
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (data) {
    config.data = data;
  }

  if (isFormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }

  instance.interceptors.request.use(
    async (config) => {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
      if (accessToken && refreshToken) {
        const user = jwtDecode(accessToken);
        const isExpired = user.exp && user.exp < Date.now() / 1000;
        if (isExpired) {
          if (!isRefreshing) {
            isRefreshing = true;
            try {
              const newToken = await regenerateToken();
              config.headers.Authorization = `Bearer ${newToken}`;
              processQueue(null, newToken);
            } catch (err) {
              processQueue(err, null);
              throw err;
            } finally {
              isRefreshing = false;
            }
          } else {
            return new Promise((resolve, reject) => {
              requestQueue.push({ resolve, reject });
            }).then((token) => {
              config.headers.Authorization = `Bearer ${token}`;
              return config;
            });
          }
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const err = {
        message: error?.response?.data?.message || error?.message,
        status: error?.response?.status || error?.status,
      };

      if (err) {
        return Promise.reject(err);
      }
      const { response } = error;
      if (response && response.status === 403) {
        const originalRequest = error.config;
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          return new Promise((resolve, reject) => {
            requestQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axios(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }
      }
      return Promise.reject(error);
    }
  );

  return instance.request(config);
};
