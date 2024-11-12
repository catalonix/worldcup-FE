import { useLoading } from 'contexts/LoadingContext';
import useNotification from './useNotification';
import calendarAPI from 'shared/api/calendar/calendarAPIService';
import { GetCalendarListParams } from 'shared/api/calendar/calendarAPIService.types';

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

  return {
    getCalendarList,
    getCalendarTaskByDate
  };
};
export default useCalendar;
