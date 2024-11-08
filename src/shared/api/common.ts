import axios from 'axios';
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

export { authAxiosInstance, unAuthAxiosInstance };
