import { useLoading } from 'contexts/LoadingContext';
import useNotification from './useNotification';
import { GetNdviInfoParams, GetNdviInfoResponseType } from 'shared/api/sensor/sensorAPIService.types';
import sensorAPI from 'shared/api/sensor/sensorAPIService';
import { useState } from 'react';

const useSensor = () => {
  const { setLoading } = useLoading();
  const { openNotification } = useNotification();

  const [ndviInfo, setNdviInfo] = useState<GetNdviInfoResponseType>();

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

  return { ndviInfo, getNdviInfo };
};
export default useSensor;
