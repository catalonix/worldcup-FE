import { authAxiosInstance } from '../common';
import { AddUserRequestType, GetUserListRequestType, GetUserListResponseType } from './userAPIService.types';

const userAPI = {
  getUserList: async (params: GetUserListRequestType) => {
    const res = await authAxiosInstance.get<GetUserListResponseType>(
      `/api/user/list/?userCode=${params.userCode.toString()}&startDate=${params.startDate}&endDate=${params.endDate}`
    );
    return res.data;
  },
  addUser: async (params: AddUserRequestType) => {
    const res = await authAxiosInstance.post('/api/user/manage/', params);
    return res.data;
  },
  editUser: async (params: AddUserRequestType) => {
    const res = await authAxiosInstance.patch('/api/user/manage/', params);
    return res.data;
  },
  checkId: async (userId: string) => {
    const res = await authAxiosInstance.get(`/api/user/check_user_id/?userId=${userId}`);
    return res.data;
  },
  checkPassword: async (password: string) => {
    const res = await authAxiosInstance.post('/api/user/check_password/', { password });
    return res.data;
  },
  deleteUser: async (userId: string) => {
    const res = await authAxiosInstance.delete(`/api/user/manage/?userId=${userId}`);
    return res.data;
  }
};

export default userAPI;
