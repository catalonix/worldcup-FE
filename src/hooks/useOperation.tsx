import { useLoading } from 'contexts/LoadingContext';
import useNotification from './useNotification';
import operationAPI from 'shared/api/operation/operationAPIService';
import { FanList, GetOperationDetailResponseType } from 'shared/api/operation/operationAPIService.types';

const useOperation = () => {
  const { setLoading } = useLoading();
  const { openNotification } = useNotification();

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

  return {
    getRemoteDetail
  };
};
export default useOperation;
