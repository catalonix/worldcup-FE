import { authAxiosInstance } from '../common';
import { GetNdviInfoParams, GetSensorInfoResponseType, GetWeatherInfoParams } from './sensorAPIService.types';

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
  getWeatherInfo: async (params: GetWeatherInfoParams) => {
    const res = await authAxiosInstance.get<GetSensorInfoResponseType>(
      `/api/sensor/weather-info/?directionType=${params.directionType}&startDate=${params.startDate}&endDate=${params.endDate}&values=${params.values?.toString()}`
    );
    return res.data;
  }
};

export default sensorAPI;
