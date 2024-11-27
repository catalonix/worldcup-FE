import { useLoading } from 'contexts/LoadingContext';
import useNotification from './useNotification';
import operationAPI from 'shared/api/operation/operationAPIService';
import {
  FanList,
  GetIrrigationResponseType,
  GetOperationDetailResponseType,
  GetRemoteStatusResponseType
} from 'shared/api/operation/operationAPIService.types';

const useOperation = () => {
  const { setLoading } = useLoading();
  const { openNotification } = useNotification();

  const getRemoteStatus = async () => {
    setLoading(true);
    try {
      const res = await operationAPI.getRemoteStatus();
      return res;
    } catch (error) {
      console.error('getRemoteStatus', error);
      openNotification('error', '원격정보 조회에 실패했어요. 다시 시도해주세요.');
      return {} as GetRemoteStatusResponseType;
    } finally {
      setLoading(false);
    }
  };

  const getRemoteDetail = async (key: FanList) => {
    setLoading(true);
    try {
      const res = await operationAPI.getRemoteDetail(key);
      return res;
    } catch (error) {
      console.error('getRemoteDetail', error);
      openNotification('error', '원격정보 상세 조회에 실패했어요. 다시 시도해주세요.');
      return {} as GetOperationDetailResponseType;
    } finally {
      setLoading(false);
    }
  };

  const getIrrigation = async () => {
    setLoading(true);
    try {
      const res = await operationAPI.getIrrigation();
      return res;
    } catch (error) {
      console.error('getIrrigation', error);
      openNotification('error', '관수제어 조회에 실패했어요. 다시 시도해주세요.');
      return {} as GetIrrigationResponseType;
    } finally {
      setLoading(false);
    }
  };

  return {
    getRemoteStatus,
    getRemoteDetail,
    getIrrigation
  };
};
export default useOperation;
