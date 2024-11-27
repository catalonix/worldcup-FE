import { authAxiosInstance } from '../common';
import {
  FanList,
  GetOperationDetailResponseType,
  GetRemoteStatusResponseType,
  GetIrrigationResponseType
} from './operationAPIService.types';

const operationAPI = {
  getRemoteStatus: async () => {
    const res = await authAxiosInstance.get<GetRemoteStatusResponseType>('/api/remote/remote-status/');
    return res.data;
  },
  getRemoteDetail: async (key: FanList) => {
    const res = await authAxiosInstance.get<GetOperationDetailResponseType>(`/api/remote/remote-detail/?key=${key}`);
    return res.data;
  },
  getIrrigation: async () => {
    const res = await authAxiosInstance.get<GetIrrigationResponseType>('/api/remote/irrigation/');
    return res.data;
  }
};

export default operationAPI;
