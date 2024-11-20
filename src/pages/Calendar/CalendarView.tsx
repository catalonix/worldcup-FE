import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Calendar as ReactBigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CustomToolbar, AddScheduleModal } from 'components/Calendar';
import useCalendar from 'hooks/useCalendar';
import { GetCalendarListItemType, GetCalendarListResponseType } from 'shared/api/calendar/calendarAPIService.types';
import useDate from 'hooks/useDate';
import { useCalendarStore } from 'shared/store/calendar/calendar';
import { SelectOptionTypes } from 'common/types';

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);

const CustomEvent = ({ event }: { event: GetCalendarListItemType }) => {
  return (
    <div
      style={{
        whiteSpace: 'normal', // 줄바꿈 허용
        wordWrap: 'break-word', // 긴 단어가 넘치지 않도록 처리
        marginBottom: '4px',
        maxHeight: 'none', // 이벤트 높이를 제한하지 않음
        overflowY: 'auto' // 이벤트가 넘칠 때 스크롤
      }}>
      <span dangerouslySetInnerHTML={{ __html: event.title.replace(/\n/g, '<br />') }} />
    </div>
  );
};

const Calendar = () => {
  const { getCalendarList, getScheduleType } = useCalendar();
  const { getCurrentMonth } = useDate();

  const { dispatchMainTypes, dispatchSubTypes } = useCalendarStore();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [searchMonth, setSearchMonth] = useState<string>(getCurrentMonth());
  const [selectedDate, setSelectedDate] = useState<string>('2024-11-15');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    '관수',
    '깎기',
    '시약',
    '시비',
    '갱신',
    '배토',
    '다짐',
    '보수',
    '제조',
    '청소',
    '경기',
    '보식',
    '파종',
    '계절',
    '장비',
    '기타'
  ]);
  const [eventsData, setEventsData] = useState<GetCalendarListResponseType>([] as GetCalendarListResponseType);

  const handleIsModalVisible = (isModalVisible: boolean) => {
    setIsModalVisible(isModalVisible);
  };

  const handleNavigate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월을 두 자리로 맞춤

    const formattedDate = `${year}-${month}`;
    setSearchMonth(formattedDate);

    // TODO: API 호출 또는 추가적인 로직 처리 가능
  };

  const handleSearch = async () => {
    // api 다시 조회
    const res = await getCalendarList({ date: searchMonth, types: selectedTypes.toString() });
    const updatedRes = res.map(event => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
      bgColor: event.type === '일정명' ? '#48C83F' : '#3B76E1'
    }));
    setEventsData([...updatedRes]);
  };

  // const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
  //   console.log(start);
  //   console.log(end);
  //   const title = window.prompt('New Event name');
  //   if (title)
  //     setEventsData([
  //       ...eventsData,
  //       {
  //         id: Number(start.toString().slice(0, 10)),
  //         start,
  //         end,
  //         title,
  //         type: '오전',
  //         bgColor: '#3B76E1'
  //       }
  //     ]);
  // };

  const handleSelectEvent = ({ start }: { start: Date }) => {
    const selectedDate = dayjs(start).format('YYYY-MM-DD');
    console.log('dd', selectedDate);

    // TODO: 이 날짜 기준으로 해당 날짜 일정 조회
    setIsEdit(true);
    setSelectedDate(start.toString());
    handleIsModalVisible(true);
  };

  const getScheduleTypes = async () => {
    const items = await getScheduleType();

    const mainTypes: SelectOptionTypes[] = [];
    const subTypes: { parentValue: string; children: SelectOptionTypes[] }[] = [];

    items.forEach(item => {
      mainTypes.push({
        label: item.name,
        value: item.key as string
      });

      // Sub types
      if (item.children && item.children.length > 0) {
        subTypes.push({
          parentValue: item.key as string, // Link to main type
          children: item.children.map(child => ({
            label: child.name as string,
            value: child.key as unknown as string
          }))
        });
      }
    });
    dispatchMainTypes(mainTypes as SelectOptionTypes[]);
    dispatchSubTypes(subTypes);
  };

  useEffect(() => {
    handleSearch();
    getScheduleTypes();
  }, [selectedTypes, searchMonth]);

  return (
    <>
      <div className="calendar-view card">
        <ReactBigCalendar
          selectable
          onNavigate={handleNavigate}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          views={['month']}
          events={eventsData}
          style={{ height: '100vh' }}
          onView={() => {
            return 'month';
          }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectEvent}
          dayPropGetter={() => ({
            style: {
              overflowY: 'scroll' // 스크롤 활성화
            }
          })}
          showAllEvents
          components={{
            event: CustomEvent,
            toolbar: props => (
              <CustomToolbar
                {...props}
                handleIsModalVisible={handleIsModalVisible}
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
              />
            ),
            month: {
              dateHeader: ({ label }) => (
                <div style={{ marginBottom: '5px' }}>
                  <strong>{label}</strong>
                </div>
              )
            }
          }}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={event => ({
            style: {
              backgroundColor: event.bgColor,
              whiteSpace: 'normal', // 줄바꿈 허용
              wordWrap: 'break-word' // 긴 단어가 넘치지 않도록 처리
            },
            title: event.title.replace(/\n/g, '<br />') // \n을 <br />로 변환
          })}
          popup={false}
        />
      </div>

      <AddScheduleModal
        handleIsModalVisible={handleIsModalVisible}
        isModalVisible={isModalVisible}
        handleSearch={handleSearch}
        selectedDate={selectedDate}
        isEdit={isEdit}
      />
    </>
  );
};
export default Calendar;
