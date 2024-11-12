import { authAxiosInstance } from '../common';
import { GetCalendarListParams, GetCalendarListResponseType } from './calendarAPIService.types';

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
  }
};

export default calendarAPI;
