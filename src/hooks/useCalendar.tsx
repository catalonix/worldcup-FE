import { useLoading } from 'contexts/LoadingContext';
import useNotification from './useNotification';
import calendarAPI from 'shared/api/calendar/calendarAPIService';
import { AddScheduleParams, GetCalendarListParams } from 'shared/api/calendar/calendarAPIService.types';

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
    } catch (error) {
      console.error('addSchedule', error);
      openNotification('error', '일정 생성에 실패하였습니다. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    getCalendarList,
    getCalendarTaskByDate,
    addSchedule
  };
};
export default useCalendar;
