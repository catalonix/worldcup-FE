import { authAxiosInstance } from '../common';
import {
  AddScheduleParams,
  GetCalendarListParams,
  GetCalendarListResponseType,
  getScheduleTypeResponseType
} from './calendarAPIService.types';

const calendarAPI = {
  getCalendarList: async (params: GetCalendarListParams) => {
    const res = await authAxiosInstance.get<GetCalendarListResponseType>(
      `/api/task/calendar/?date=${params.date}&types=${params.types}`
    );
    return res.data;
  },
  getCalendarTaskByDate: async (params: GetCalendarListParams) => {
    const res = await authAxiosInstance.get<GetCalendarListResponseType>(
      `/api/task/calendar/?date=${params.date}&types=${params.types}`
    );
    return res.data;
  },
  addSchedule: async (params: AddScheduleParams) => {
    const res = await authAxiosInstance.post<GetCalendarListResponseType>('/api/task/', params);
    return res.data;
  },
  getScheduleType: async () => {
    const res = await authAxiosInstance.get<getScheduleTypeResponseType>('/api/task/type/');
    return res.data;
  },
  deleteSchedule: async (date: string) => {
    const res = await authAxiosInstance.delete(`/api/task/?date=${date}`);
    return res.data;
  },
  editSchedule: async (params: AddScheduleParams) => {
    const res = await authAxiosInstance.patch('/api/task', params);
    return res.data;
  }
};

export default calendarAPI;
