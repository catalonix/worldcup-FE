import { authAxiosInstance } from '../common';
import {
  DirectionType,
  GetFieldImageResponseType,
  GetGradeValueResponseType,
  GetNdviCameraResponseType,
  GetNdviChartResponseType,
  GetNdviImageResponseType,
  GetNdviInfoParams,
  GetSensorInfoResponseType,
  GetSensorStatusResponseType,
  GetSensorSummaryResponseType,
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
  },
  getSensorStatus: async () => {
    const res = await authAxiosInstance.get<GetSensorStatusResponseType>('/api/sensor/sensor-status/');
    return res.data;
  },
  getSensorSummary: async () => {
    const res = await authAxiosInstance.get<GetSensorSummaryResponseType>('/api/sensor/sensor-summary/');
    return res.data;
  },
  getGradeValue: async () => {
    const res = await authAxiosInstance.get<GetGradeValueResponseType>('/api/sensor/grade-value/');
    return res.data;
  },
  setGradeValue: async (params: GetGradeValueResponseType) => {
    const res = await authAxiosInstance.patch('/api/sensor/grade-value/', params);
    return res.data;
  },
  getNdviCamera: async () => {
    const res = await authAxiosInstance.get<GetNdviCameraResponseType>('/api/sensor/ndvi-camera/');
    return res.data;
  },
  getNdviImage: async (startDate: string, endDate: string) => {
    const res = await authAxiosInstance.get<GetNdviImageResponseType>(
      `/api/sensor/ndvi-image/?startDate=${startDate}&endDate=${endDate}`
    );
    return res.data;
  },
  getFieldImage: async (startDate: string, endDate: string) => {
    const res = await authAxiosInstance.get<GetFieldImageResponseType>(
      `/api/sensor/field-image/?startDate=${startDate}&endDate=${endDate}`
    );
    return res.data;
  },
  captureCamera: async () => {
    const res = await authAxiosInstance.post('/api/sensor/field-capture/');
    return res.data;
  },
  getNdviChart: async () => {
    const res = await authAxiosInstance.get<GetNdviChartResponseType>('/api/sensor/ndvi-chart/');
    return res.data;
  },
  getLiveUrl: async (direction: DirectionType) => {
    const res = await authAxiosInstance.get<{ url: string }>(`/api/sensor/field-live/?direction=${direction}`);
    return res.data;
  },
  downloadWeatherCsv: async (startDate: string, endDate: string) => {
    const res = await authAxiosInstance.get(`/api/sensor/weather-csv/?startDate=${startDate}&endDate=${endDate}`);
    return res.data;
  }
};

export default sensorAPI;
