import { authAxiosInstance } from '../common';
import {
  GetNdviInfoParams,
  GetSensorInfoResponseType,
  GetSoilSummaryResponseType,
  GetWeatherHeaderResponseType,
  GetWeatherInfoParams,
  GetWeatherSummaryResponseType
} from './sensorAPIService.types';

const sensorAPI = {
  getNdviInfo: async (params: GetNdviInfoParams) => {
    const res = await authAxiosInstance.get<GetSensorInfoResponseType>(
      `/api/sensor/ndvi-info/?startDate=${params.startDate}&endDate=${params.endDate}`
    );
    return res.data;
  },
  getSoilDate: async () => {
    const res = await authAxiosInstance.get<string[]>('/api/sensor/soil-date/');
    return res.data;
  },
  getSoilInfo: async (params: GetNdviInfoParams) => {
    const res = await authAxiosInstance.get<GetSensorInfoResponseType>(
      `/api/sensor/soil-info/?startDate=${params.startDate}&endDate=${params.endDate}`
    );
    return res.data;
  },
  getSoilSummary: async (date: string) => {
    const res = await authAxiosInstance.get<GetSoilSummaryResponseType>(`/api/sensor/soil-summary/?date=${date}`);
    return res.data;
  },
  getWeatherInfo: async (params: GetWeatherInfoParams) => {
    const res = await authAxiosInstance.get<GetSensorInfoResponseType>(
      `/api/sensor/weather-info/?directionType=${params.directionType}&startDate=${params.startDate}&endDate=${params.endDate}&values=${params.values?.toString()}`
    );
    return res.data;
  },
  getWeatherSummray: async () => {
    const res = await authAxiosInstance.get<GetWeatherSummaryResponseType>('/api/sensor/weather-summary/');
    return res.data;
  },
  getWeatherHeader: async () => {
    const res = await authAxiosInstance.get<GetWeatherHeaderResponseType>('/api/sensor/weather-header/');
    return res.data;
  }
};

export default sensorAPI;
