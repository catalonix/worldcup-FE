import { unAuthAxiosInstance } from '../common';
import { LoginParams, LoginResponseType } from './authAPIService.types';

const authAPI = {
  login: async (params: LoginParams) => {
    const { data } = await unAuthAxiosInstance.post<LoginResponseType>('/api/user/login', params);
    console.log('data', data);
  }
};

export default authAPI;
