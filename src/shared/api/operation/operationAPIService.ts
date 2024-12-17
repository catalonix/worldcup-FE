import { authAxiosInstance } from '../common';
import {
  FanList,
  GetOperationDetailResponseType,
  GetRemoteStatusResponseType,
  GetIrrigationResponseType,
  UpdateIrrigationParams,
  GetFanControlResponseType,
  FanType,
  GetDetailFanScheduleResponseType,
  AddFanParams
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
  },
  stopAllFan: async () => {
    const res = await authAxiosInstance.post('/api/remote/fan-stop-all/');
    return res.data;
  },
  updateFanActive: async (key: FanList, active: boolean) => {
    const res = await authAxiosInstance.post<FanType>('/api/remote/fan-control/', {
      fanId: key,
      fanState: active ? 'on' : 'off'
    });
    return res.data;
  },
  getFanSchedule: async (month: number, year: number, fans: string[]) => {
    const res = await authAxiosInstance.get(`/api/remote/fan-schedule/?month=${month}&year=${year}&fans=${fans}`);
    return res.data;
  },
  getDetailFanSchedule: async (month: number, year: number, day: number, fans: string[]) => {
    const res = await authAxiosInstance.get<GetDetailFanScheduleResponseType>(
      `/api/remote/fan-schedule-detail/?month=${month}&year=${year}&day=${day}&fans=${fans}`
    );
    return res.data;
  },
  deleteFanSchedule: async (selectedSchedules: string) => {
    const res = await authAxiosInstance.delete(`/api/remote/fan-schedule-detail/?no=${selectedSchedules}`);
    return res.data;
  },
  addFanSchedule: async (addFanParams: AddFanParams) => {
    const res = await authAxiosInstance.post('/api/remote/fan-schedule/', addFanParams);
    return res.data;
  },
  downloadIrrigation: async () => {
    const res = await authAxiosInstance.get('/api/remote/irrigation-schedule-csv/');
    return res.data;
  }
};

export default operationAPI;
