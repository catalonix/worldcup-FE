import { authAxiosInstance } from '../common';
import { FanList, GetOperationDetailResponseType } from './operationAPIService.types';

const operationAPI = {
  getRemoteDetail: async (key: FanList) => {
    const res = await authAxiosInstance.get<GetOperationDetailResponseType>(`/api/remote/remote-detail/?key=${key}`);
    return res.data;
  }
};

export default operationAPI;
