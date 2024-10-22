import { authAxiosInstance } from '../common';
import { GetUserListResponseType } from './userAPIService.types';

const userAPI = {
  getUserList: async () => {
    const { data } = await authAxiosInstance.get<GetUserListResponseType>('/api/user/list');
    console.log('data', data);
  }
};

export default userAPI;
