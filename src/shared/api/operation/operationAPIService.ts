import { authAxiosInstance } from '../common';
import {
  FanList,
  GetOperationDetailResponseType,
  GetRemoteStatusResponseType,
  GetIrrigationResponseType,
  UpdateIrrigationParams,
  GetFanControlResponseType
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
  },
  updateIrrigation: async (params: UpdateIrrigationParams) => {
    const res = await authAxiosInstance.post('/api/remote/irrigation/', params);
    return res.data;
  },
  getFanControl: async () => {
    const res = await authAxiosInstance.get<GetFanControlResponseType>('/api/remote/fan-control/');
    return res.data;
  }
};

export default operationAPI;
