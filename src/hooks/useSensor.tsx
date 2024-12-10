import { useLoading } from 'contexts/LoadingContext';
import useNotification from './useNotification';
import {
  DirectionType,
  GetGradeValueResponseType,
  GetNdviChartResponseType,
  GetNdviInfoParams,
  GetObservationParams,
  GetSensorInfoResponseType,
  GetSensorStatusResponseType,
  GetSensorSummaryResponseType,
  GetSoilSummaryResponseType,
  GetWeatherHeaderResponseType,
  GetWeatherInfoParams,
  GetWeatherSummaryResponseType,
  NdviCameraType
} from 'shared/api/sensor/sensorAPIService.types';
import sensorAPI from 'shared/api/sensor/sensorAPIService';
import { useState } from 'react';

const useSensor = () => {
  const { setLoading } = useLoading();
  const { openNotification } = useNotification();

  const [ndviInfo, setNdviInfo] = useState<GetSensorInfoResponseType>();
  const [soilInfo, setSoilInfo] = useState<GetSensorInfoResponseType>();
  const [soilDates, setSoilDates] = useState<{ label: string; value: string }[]>([]);
  const [soilSummary, setSoilSummary] = useState<GetSoilSummaryResponseType>([]);
  const [observation, setObservation] = useState<GetSensorInfoResponseType>();
  const [weatherInfo, setWeahterInfo] = useState<GetSensorInfoResponseType>();
  const [weatherSummary, setWeatherSummary] = useState<GetWeatherSummaryResponseType>();
  const [weatherHeader, setWeatherHeader] = useState<GetWeatherHeaderResponseType>();
  const [sensorStatus, setSensorStatus] = useState<GetSensorStatusResponseType>();
  const [sensorSummary, setSensorSummary] = useState<GetSensorSummaryResponseType>();

  const getNdviInfo = async (params: GetNdviInfoParams) => {
    setLoading(true);
    try {
      const result = await sensorAPI.getNdviInfo(params);
      if (result) {
        setNdviInfo(result);
      }
      return result;
    } catch (error) {
      console.error('getNdviInfo', error);
      openNotification('error', 'Ndvi정보 조회에 실패하였습니다. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getSoilDate = async () => {
    setLoading(true);
    try {
      const result = await sensorAPI.getSoilDate();
      if (result) {
        const options = result.map(it => {
          return { value: it, label: it };
        });
        setSoilDates(options);
      }
      return result;
    } catch (error) {
      console.error('getSoilDate', error);
      openNotification('error', '토양 날짜 조회에 실패하였습니다. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getSoilInfo = async (params: GetNdviInfoParams) => {
    setLoading(true);
    try {
      const result = await sensorAPI.getSoilInfo(params);
      if (result) {
        setSoilInfo(result);
      }
      return result;
    } catch (error) {
      console.error('getSoilInfo', error);
      openNotification('error', 'soil 정보 조회에 실패하였습니다. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getSoilSummary = async (date: string) => {
    setLoading(true);
    try {
      const result = await sensorAPI.getSoilSummary(date);
      if (result) {
        setSoilSummary(result);
      }
      return result;
    } catch (error) {
      console.error('getSoilSummary', error);
      openNotification('error', 'getSoilSummary 정보 조회에 실패하였습니다. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getWeatherInfo = async (params: GetWeatherInfoParams) => {
    setLoading(true);
    try {
      const result = await sensorAPI.getWeatherInfo(params);
      if (result) {
        setWeahterInfo(result);
      }
      return result;
    } catch (error) {
      console.error('getWeatherInfo', error);
      openNotification('error', 'weather 정보 조회에 실패하였습니다. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getWeatherSummary = async () => {
    setLoading(true);
    try {
      const result = await sensorAPI.getWeatherSummray();
      if (result) {
        setWeatherSummary(result);
      }
      return result;
    } catch (error) {
      console.error('getWeatherSummary', error);
      openNotification('error', 'weather 정보 조회에 실패하였습니다. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getWeatherHeader = async () => {
    setLoading(true);
    try {
      const result = await sensorAPI.getWeatherHeader();
      if (result) {
        setWeatherHeader(result);
      }
      return result;
    } catch (error) {
      console.error('getWeatherHeader', error);
      openNotification('error', 'weather 정보 조회에 실패하였습니다. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getObservation = async (params: GetObservationParams) => {
    setLoading(true);
    try {
      let res;
      if (params.type === 'camera') {
        res = await sensorAPI.getNdviInfo({ startDate: params.startDate, endDate: params.endDate });
      } else if (params.type === 'soilRobot') {
        res = await sensorAPI.getSoilInfo({
          startDate: params.startDate,
          endDate: params.endDate
        });
      } else {
        res = await sensorAPI.getWeatherInfo({
          startDate: params.startDate,
          endDate: params.endDate,
          directionType: params.directionType,
          values: params.values
        });
      }

      if (res) {
        console.log('res', res);
        setObservation(res);
      }
    } catch (error) {
      console.error('getObservation', error);
      openNotification('error', 'observation 정보 조회에 실패하였습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  //잔디생육 데이터
  const getSensorStatus = async () => {
    setLoading(true);
    try {
      const result = await sensorAPI.getSensorStatus();
      if (result) {
        setSensorStatus(result);
      }
      return result;
    } catch (error) {
      console.error('getSensorStatus', error);
      openNotification('error', 'sensor 정보 조회에 실패하였습니다. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 대시보드용
  const getSensorSummary = async () => {
    setLoading(true);
    try {
      const result = await sensorAPI.getSensorSummary();
      if (result) {
        setSensorSummary(result);
      }
      return result;
    } catch (error) {
      console.error('getSensorSummary', error);
      openNotification('error', 'sensor 정보 조회에 실패하였습니다. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getGradeValue = async () => {
    setLoading(true);
    try {
      const result = await sensorAPI.getGradeValue();
      return result;
    } catch (error) {
      console.error('getGradeValue', error);
      openNotification('error', '범례 정보 조회에 실패하였습니다. 다시 시도해주세요.');
      return {} as GetGradeValueResponseType;
    } finally {
      setLoading(false);
    }
  };

  const setGradeValue = async (params: GetGradeValueResponseType) => {
    setLoading(true);
    try {
      await sensorAPI.setGradeValue(params);
      return true;
    } catch (error) {
      console.error('setGradeValue', error);
      openNotification('error', '범례 정보 수정에 실패하였습니다. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getNdviCamera = async () => {
    setLoading(true);
    try {
      const res = await sensorAPI.getNdviCamera();
      return res;
    } catch (error) {
      console.error('getNdviCamera', error);
      openNotification('error', 'NDVI 카메라 조회에 실패하였습니다. 다시 시도해주세요.');
      return { west: {} as NdviCameraType, east: {} as NdviCameraType, south: {} as NdviCameraType };
    } finally {
      setLoading(false);
    }
  };

  const getNdviImage = async (startDate: string, endDate: string) => {
    setLoading(true);
    try {
      const res = await sensorAPI.getNdviImage(startDate, endDate);
      return res;
    } catch (error) {
      console.error('getNdviImage', error);
      openNotification('error', 'NDVI 이미지 조회에 실패하였습니다. 다시 시도해주세요.');
      return { west: [], east: [], south: [] };
    } finally {
      setLoading(false);
    }
  };

  const getFieldImage = async (startDate: string, endDate: string) => {
    setLoading(true);
    try {
      const res = await sensorAPI.getFieldImage(startDate, endDate);
      return res;
    } catch (error) {
      console.error('getFieldImage', error);
      openNotification('error', '경기장 이미지 조회에 실패하였습니다. 다시 시도해주세요.');
      return { west: [], east: [], south: [], captureDate: '' };
    } finally {
      setLoading(false);
    }
  };

  const captureCamera = async () => {
    setLoading(true);
    try {
      await sensorAPI.captureCamera();
      return true;
    } catch (error) {
      console.error('captureCamera', error);
      openNotification('error', '실시간 촬영에 실패하였습니다. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getNdviChart = async () => {
    setLoading(true);
    try {
      const res = await sensorAPI.getNdviChart();
      return res;
    } catch (error) {
      console.error('getNdviChart', error);
      openNotification('error', 'Ndvi 차트 조회에 실패하였습니다. 다시 시도해주세요.');
      return {} as GetNdviChartResponseType;
    } finally {
      setLoading(false);
    }
  };

  const getLiveUrl = async (direction: DirectionType) => {
    setLoading(true);
    try {
      const res = await sensorAPI.getLiveUrl(direction);
      return res;
    } catch (error) {
      console.error('getLiveUrl', error);
      openNotification('error', '실시간 카메라 조회에 실패하였습니다. 다시 시도해주세요.');
      return '';
    } finally {
      setLoading(false);
    }
  };

  return {
    ndviInfo,
    soilInfo,
    weatherInfo,
    weatherSummary,
    soilDates,
    soilSummary,
    weatherHeader,
    observation,
    sensorStatus,
    sensorSummary,
    getNdviInfo,
    getSoilDate,
    getSoilInfo,
    getSoilSummary,
    getWeatherInfo,
    getWeatherSummary,
    getWeatherHeader,
    getObservation,
    getSensorStatus,
    getSensorSummary,
    getGradeValue,
    setGradeValue,
    getNdviCamera,
    getFieldImage,
    getNdviImage,
    captureCamera,
    getNdviChart,
    getLiveUrl
  };
};
export default useSensor;
