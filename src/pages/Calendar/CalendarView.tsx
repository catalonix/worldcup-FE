import React, { useState } from 'react';
import { Calendar as ReactBigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CustomToolbar, AddScheduleModal } from 'components/Calendar';

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);

const CustomEvent = ({ event }: { event: { title: string } }) => {
  return (
    <div>
      <span dangerouslySetInnerHTML={{ __html: event.title.replace(/\n/g, '<br />') }} />
    </div>
  );
};

const Calendar = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('2024-11-15');

  const [eventsData, setEventsData] = useState([
    {
      id: 0,
      title: '[오전] 주경기장 보식<br/> 주경기장 시약<br/>', // user가 입력한 값 X, 백엔드에서 조합한 값
      start: new Date(2024, 10, 5),
      end: new Date(2024, 10, 5),
      type: '오전' // 오전, 오후, 일정명 (am, pm, schedule)
    },
    {
      id: 1,
      title: '[오후] 주경기장 보식<br/> 주경기장 시약<br/>', // user가 입력한 값 X, 백엔드에서 조합한 값
      start: new Date(2024, 10, 5),
      end: new Date(2024, 10, 5),
      type: '오후' // 오전, 오후, 일정명
    },
    {
      id: 2,
      title: '주경기장 보식\n 주경기장 시약\n', // user가 입력한 값 X, 백엔드에서 조합한 값
      start: new Date(2024, 10, 10),
      end: new Date(2024, 10, 10),
      type: '일정명' // 오전, 오후, 일정명
    }
  ]);

  const handleIsModalVisible = (isModalVisible: boolean) => {
    setIsModalVisible(isModalVisible);
  };

  const handleSearch = () => {
    // api 다시 조회
  };

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    console.log(start);
    console.log(end);
    const title = window.prompt('New Event name');
    if (title)
      setEventsData([
        ...eventsData,
        {
          id: Number(start.toString().slice(0, 10)),
          start,
          end,
          title: '주경기장 보식\n 주경기장 시약\n',
          type: ''
        }
      ]);
  };

  const handleSelectEvent = ({ start, end }: { start: Date; end: Date }) => {
    console.log(start);
    console.log(end);
    setIsEdit(true);
    setSelectedDate(start.toString());
    handleIsModalVisible(true);
  };

  return (
    <>
      <div className="calendar-view card">
        <ReactBigCalendar
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventsData}
          style={{ height: '100vh' }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelect}
          components={{
            event: CustomEvent,
            toolbar: CustomToolbar
          }}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={event => ({
            style: {
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
