import { authAxiosInstance } from '../common';
import { GetNdviInfoParams, GetNdviInfoResponseType } from './sensorAPIService.types';

const sensorAPI = {
  getNdviInfo: async (params: GetNdviInfoParams) => {
    const res = await authAxiosInstance.get<GetNdviInfoResponseType>(
      `/api/sensor/ndvi-info/?startDate=${params.startDate}&endDate=${params.endDate}`
    );
    return res.data;
  }
};

export default sensorAPI;
