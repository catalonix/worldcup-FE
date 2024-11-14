import { authAxiosInstance } from '../common';
import { AddScheduleParams, GetCalendarListParams, GetCalendarListResponseType } from './calendarAPIService.types';

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
  }
};

export default calendarAPI;
