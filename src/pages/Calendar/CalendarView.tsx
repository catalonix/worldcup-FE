import React, { useState } from 'react';
import { Calendar as ReactBigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomToolbar from 'components/common/Calendar/Toolbar/Toolbar';

const Calendar = () => {
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);

  const [eventsData, setEventsData] = useState([
    {
      title: ['주경기장 보식', '주경기장 시약'], // user가 입력한 값 X, 백엔드에서 조합한 값
      start: new Date(2024, 5, 5),
      end: new Date(2024, 5, 5),
      type: '오전' // 오전, 오후, 일정명 (am, pm, schedule)
    },
    {
      title: ['주경기장 보식', '주경기장 시약'], // user가 입력한 값 X, 백엔드에서 조합한 값
      start: new Date(2024, 5, 5),
      end: new Date(2024, 5, 5),
      type: '오후' // 오전, 오후, 일정명
    },
    {
      title: ['주경기장 보식', '주경기장 시약'], // user가 입력한 값 X, 백엔드에서 조합한 값
      start: new Date(2024, 5, 5),
      end: new Date(2024, 5, 5),
      type: '일정명' // 오전, 오후, 일정명
    }
  ]);

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    console.log(start);
    console.log(end);
    const title = window.prompt('New Event name');
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title: [],
          type: ''
        }
      ]);
  };

  return (
    <div className="calendar-view card">
      <ReactBigCalendar
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: '100vh' }}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={handleSelect}
        components={{
          toolbar: CustomToolbar
        }}
      />
    </div>
  );
};
export default Calendar;
