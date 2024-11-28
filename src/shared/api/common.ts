import axios, { AxiosError } from 'axios';
import { InternalAxiosRequestConfig } from 'axios';

// eslint-disable-next-line quotes
const baseURL = `${process.env.REACT_APP_API_END_POINT}`;

const authAxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
    ...(typeof window !== 'undefined' && {
      // eslint-disable-next-line quotes
      Authorization: localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : ''
    })
  }
});

const unAuthAxiosInstance = axios.create({
  baseURL
});

let isRefreshing = false;
let failedQueue: { resolve: (token: string) => void; reject: (err: AxiosError) => void }[] = [];

const processQueue = (token: string | null, error: AxiosError | null) => {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error!);
    }
  });
  failedQueue = [];
};

authAxiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers = config.headers || {};

  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = localStorage.getItem('accessToken')
        ? `Bearer ${localStorage.getItem('accessToken')}`
        : '';
    }
  }
  return config;
});

authAxiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axios(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await unAuthAxiosInstance.post('/api/user/refresh/', {
          refresh: localStorage.getItem('refreshToken')
        });

        // 갱신된 토큰 저장
        const newAccessToken = data.access;
        localStorage.setItem('accessToken', newAccessToken);

        // 대기 중인 요청 처리
        processQueue(newAccessToken, null);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return authAxiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(null, refreshError as AxiosError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export { authAxiosInstance, unAuthAxiosInstance };
