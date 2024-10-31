import { authAxiosInstance } from '../common';
import { GetNdviInfoParams, GetSensorInfoResponseType } from './sensorAPIService.types';

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
  }
};

export default sensorAPI;
