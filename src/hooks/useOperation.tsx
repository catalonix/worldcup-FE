import { useLoading } from 'contexts/LoadingContext';
import useNotification from './useNotification';
import operationAPI from 'shared/api/operation/operationAPIService';
import {
  FanList,
  GetFanControlResponseType,
  GetIrrigationResponseType,
  GetOperationDetailResponseType,
  GetRemoteStatusResponseType,
  UpdateIrrigationParams
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

      const result = {
        program: [...res.program.map(it => ({ ...it, time: '2', key: it.programId }))],
        unit: [...res.unit.map(it => ({ ...it, time: '2', key: it.programId }))]
      };
      return result;
    } catch (error) {
      console.error('getIrrigation', error);
      openNotification('error', '관수제어 조회에 실패했어요. 다시 시도해주세요.');
      return { program: [], unit: [] } as GetIrrigationResponseType;
    } finally {
      setLoading(false);
    }
  };

  const updateIrrigation = async (params: UpdateIrrigationParams) => {
    setLoading(true);
    try {
      await operationAPI.updateIrrigation(params);
      return true;
    } catch (error) {
      console.error('updateIrrigation', error);
      openNotification('error', '관수제어 수정에 실패했어요. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getFanControl = async () => {
    setLoading(true);
    try {
      const res = await operationAPI.getFanControl();
      return res;
    } catch (error) {
      console.error('getFanControl', error);
      openNotification('error', '쿨링팬제어 조회에 실패했어요. 다시 시도해주세요.');
      return {} as GetFanControlResponseType;
    } finally {
      setLoading(false);
    }
  };

  const stopAllFan = async () => {
    setLoading(true);
    try {
      await operationAPI.stopAllFan();
      openNotification('success', '쿨링팬이 모두 정지되었어요.');
      return true;
    } catch (error) {
      console.error('stopAllFan', error);
      openNotification('error', '쿨링팬제어 모두 정지에 실패했어요. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateFanActive = async (key: FanList, active: boolean) => {
    setLoading(true);
    try {
      const res = await operationAPI.updateFanActive(key, active);
      openNotification('success', '쿨링팬 상태가 변경되었어요.');
      return res;
    } catch (error) {
      console.error('updateFanActive', error);
      openNotification('error', '쿨링팬 상태 변경에 실패했어요. 다시 시도해주세요.');
      return {};
    } finally {
      setLoading(false);
    }
  };

  const getFanSchedule = async (month: number, year: number, fans: string[]) => {
    setLoading(true);
    try {
      const res = await operationAPI.getFanSchedule(month, year, fans);
      return res;
    } catch (error) {
      console.error('getFanSchedule', error);
      openNotification('error', '원격작동 일정관리 조회에 실패했어요. 다시 시도해주세요.');
      return {};
    } finally {
      setLoading(false);
    }
  };

  const getDetailFanSchedule = async (month: number, year: number, day: number, fans: string[]) => {
    setLoading(true);
    try {
      const res = await operationAPI.getDetailFanSchedule(month, year, day, fans);
      return res;
    } catch (error) {
      console.error('getDetailFanSchedule', error);
      openNotification('error', '원격작동 상세 조회에 실패했어요. 다시 시도해주세요.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const deleteDetailFanSchedule = async (no: string) => {
    setLoading(true);
    try {
      await operationAPI.deleteFanSchedule(no);
      openNotification('success', '원격작동 일정이 삭제되었어요.');
      return true;
    } catch (error) {
      console.error('deleteDetailFanSchedule', error);
      openNotification('error', '원격작동 일정 삭제에 실패했어요. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    getRemoteStatus,
    getRemoteDetail,
    getIrrigation,
    updateIrrigation,
    getFanControl,
    stopAllFan,
    updateFanActive,
    getFanSchedule,
    getDetailFanSchedule,
    deleteDetailFanSchedule
  };
};
export default useOperation;
