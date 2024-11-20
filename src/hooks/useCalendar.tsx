import { useLoading } from 'contexts/LoadingContext';
import useNotification from './useNotification';
import calendarAPI from 'shared/api/calendar/calendarAPIService';
import {
  AddScheduleParams,
  GetCalendarListParams,
  getScheduleTypeResponseType
} from 'shared/api/calendar/calendarAPIService.types';
const useCalendar = () => {
  const { setLoading } = useLoading();
  const { openNotification } = useNotification();

  const getCalendarList = async (params: GetCalendarListParams) => {
    setLoading(true);
    try {
      const result = await calendarAPI.getCalendarList(params);
      return result;
    } catch (error) {
      console.error('getCalendarList', error);
      openNotification('error', '일정 조회에 실패하였습니다. 다시 시도해주세요.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getCalendarTaskByDate = async (params: GetCalendarListParams) => {
    setLoading(true);
    try {
      const result = await calendarAPI.getCalendarTaskByDate(params);
      return result;
    } catch (error) {
      console.error('getCalendarTaskByDate', error);
      openNotification('error', '일정 조회에 실패하였습니다. 다시 시도해주세요.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addSchedule = async (params: AddScheduleParams) => {
    setLoading(true);
    try {
      await calendarAPI.addSchedule(params);
      return true;
      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      console.error('addSchedule', error);
      openNotification(
        'error',
        `${error.status === 400 ? '해당 날짜에 이미 등록된 작업일정이 있습니다.' : '일정 생성에 실패하였습니다. 다시 시도해주세요.'}`
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getScheduleType = async () => {
    setLoading(true);
    try {
      const res = await calendarAPI.getScheduleType();
      return res as getScheduleTypeResponseType;
    } catch (error) {
      console.error('getScheduleType', error);
      openNotification('error', '스케쥴 타입 조회에 문제가 생겼습니다. 다시 시도해주세요.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const deleteSchedule = async (date: string) => {
    setLoading(true);
    try {
      await calendarAPI.deleteSchedule(date);
      return true;
    } catch (error) {
      console.error('deleteSchedule', error);
      openNotification('error', '스케쥴 삭제에 문제가 생겼습니다. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (date: string) => {
    setLoading(true);
    try {
      await calendarAPI.deleteSchedule(date);
      return true;
    } catch (error) {
      console.error('editTask', error);
      openNotification('error', '스케쥴 수정에 문제가 생겼습니다. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { getCalendarList, getCalendarTaskByDate, addSchedule, getScheduleType, deleteSchedule, editTask };
};
export default useCalendar;
