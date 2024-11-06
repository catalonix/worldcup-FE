import { useLoading } from 'contexts/LoadingContext';
import useNotification from './useNotification';
import {
  GetNdviInfoParams,
  GetSensorInfoResponseType,
  GetSoilSummaryResponseType,
  GetWeatherInfoParams,
  GetWeatherSummaryResponseType
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
  const [weatherInfo, setWeahterInfo] = useState<GetSensorInfoResponseType>();
  const [weatherSummary, setWeatherSummary] = useState<GetWeatherSummaryResponseType>();

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

  return {
    ndviInfo,
    soilInfo,
    weatherInfo,
    weatherSummary,
    soilDates,
    soilSummary,
    getNdviInfo,
    getSoilDate,
    getSoilInfo,
    getSoilSummary,
    getWeatherInfo,
    getWeatherSummary
  };
};
export default useSensor;
