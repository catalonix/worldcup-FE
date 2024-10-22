import { unAuthAxiosInstance } from '../common';
import { LoginParams, LoginResponseType } from './authAPIService.types';

const authAPI = {
  login: async (params: LoginParams) => {
    const res = await unAuthAxiosInstance.post<LoginResponseType>('/api/user/login/', params);
    return res.data;
  }
};

export default authAPI;
