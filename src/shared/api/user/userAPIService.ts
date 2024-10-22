import { authAxiosInstance } from '../common';
import { GetUserListRequestType, GetUserListResponseType } from './userAPIService.types';

const userAPI = {
  getUserList: async (params: GetUserListRequestType) => {
    const res = await authAxiosInstance.get<GetUserListResponseType>(
      `/api/user/list/?userCode=${params.userCode.toString()}&startDate=${params.startDate}&endDate=${params.endDate}`
    );
    return res.data;
  }
};

export default userAPI;
