import React, { useEffect, useMemo, useState } from 'react';
import Modal from 'components/common/Modal';
import { Badge, Button, Calendar, Checkbox, ConfigProvider, DatePicker, GetProp, Input } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import koKR from 'antd/lib/locale/ko_KR';
import { remoteOperationFanOptions } from 'common/constants/remoteOperations';
import useOperation from 'hooks/useOperation';
import { DetailFan } from 'shared/api/operation/operationAPIService.types';
import { dateFormat } from 'common/types';
import useNotification from 'hooks/useNotification';

interface RemoteScheduleModalProps {
  isModalVisible: boolean;
  handleIsModalVisible: (value: boolean) => void;
}

dayjs.locale('ko');

const RemoteScheduleModal = (props: RemoteScheduleModalProps) => {
  const { openNotification } = useNotification();
  const { getFanSchedule, getDetailFanSchedule, deleteDetailFanSchedule, addFanSchedule } = useOperation();
  const [selectedFans, setSelectedFans] = useState<string[]>(['1', '2', '3', '4', '5', '6', '7']);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate())));
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate())));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate())));
  const [comment, setComment] = useState<string>('');
  const [runTime, setRunTime] = useState<number>(30);
  const [times, setTimes] = useState<string[]>(['', '', '', '', '', '', '', '']);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [events, setEvents] = useState<string[]>([]);
  const [detailEvent, setDetailEvent] = useState<DetailFan[]>([]);
  const [isCheckedList, setIsCheckedList] = useState<number[]>([]);

  const handleChangeSelectedFans: GetProp<typeof Checkbox.Group, 'onChange'> = checkedValues => {
    setSelectedFans(checkedValues as string[]);
    search();
  };

  const handleCancel = () => {
    setIsCheckedList([]);
    props.handleIsModalVisible(false);
    resetAddScheduleForm();
  };

  const handleCancelDetailModal = () => {
    setIsCheckedList([]);
    setIsDetailModalOpen(false);
  };

  const search = async () => {
    const res = await getFanSchedule(selectedDate.get('month') + 1, selectedDate.get('year'), selectedFans);
    setEvents(res);
  };

  const searchDetail = async () => {
    const res = await getDetailFanSchedule(
      selectedDate.get('month') + 1,
      selectedDate.get('year'),
      selectedDate.get('date'),
      selectedFans
    );
    setDetailEvent(res);
  };

  // TODO: 해당 날에 일정이 있으면 모달 오픈
  const handleChangeSelectDate = (value: Dayjs) => {
    console.log('handleChangeSelectDate', value);
    setSelectedDate(value);
    setIsDetailModalOpen(true);
  };

  const handleChangeDate = (value: Dayjs) => {
    setSelectedDate(value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const dateCellRender = useMemo(() => {
    // eslint-disable-next-line react/display-name
    return (value: Dayjs) => {
      const isEventDay = events.includes(value.format('YYYY-MM-DD')); // 이벤트 날짜인지 확인
      return isEventDay ? (
        <ul className="events">
          <li key={value.format('YYYY-MM-DD')} style={{ color: 'blue' }}>
            <Badge status="warning" style={{ display: 'none' }} />
          </li>
        </ul>
      ) : null;
    };
  }, [events]);

  const handleCheckbox = (isChecked: boolean, value: number) => {
    if (isChecked) {
      setIsCheckedList(prev => [...prev, value]);
    } else {
      setIsCheckedList(prev => prev.filter(item => item !== value));
    }
  };

  const handleClickDeleteDetailSchedule = async () => {
    const res = await deleteDetailFanSchedule(isCheckedList.toString());
    if (res) {
      searchDetail();
    }
  };

  const handleChangeTime = (index: number, value: string) => {
    const updatedTimes = [...times];
    updatedTimes[index] = value;
    setTimes(updatedTimes);
  };

  const resetAddScheduleForm = () => {
    setComment('');
    setTimes(['', '', '', '', '']);
    setRunTime(30);
    setSelectedFans(['1', '2', '3', '4', '5', '6', 'test']);
  };

  const validateForm = () => {
    // startDate와 endDate는 필수값
    if (!startDate || !endDate) {
      return '시작일과 종료일을 선택해주세요.';
    }

    // selectedFans는 필수값이어야 함
    if (!selectedFans || selectedFans.length === 0) {
      return '쿨링팬은 하나라도 선택되어야해요.';
    }

    // runTime은 숫자여야 하며 필수값임
    if (!runTime || isNaN(runTime) || runTime <= 0) {
      return '작동시간을 확인해주세요.';
    }

    // times는 배열이고, 하나 이상의 값이 있어야 함
    if (!times || times.every(time => !time.trim())) {
      return '작동 일정을 확인해주세요';
    }

    // 모든 조건이 통과되면 null 반환 (valid)
    return null;
  };

  const handleAddSchedule = async () => {
    const validationError = validateForm();

    if (validationError) {
      // validation 실패 시 에러 메시지 처리
      openNotification('warning', validationError);
      return;
    }

    const res = await addFanSchedule({
      startDate: startDate.format(dateFormat),
      endDate: endDate.format(dateFormat),
      fans: selectedFans.toString(),
      comment,
      runTime: Number(runTime),
      times: times.toString()
    });
    if (res) {
      search();
      resetAddScheduleForm();
    }
  };

  useEffect(() => {
    if (props.isModalVisible) {
      search();
    }
  }, [props.isModalVisible, selectedDate]);

  useEffect(() => {
    if (isDetailModalOpen) {
      searchDetail();
    }
  }, [isDetailModalOpen]);

  return (
    <div className="remote-schedule-modal">
      <Modal title="원격작동 일정관리" isModalVisible={props.isModalVisible} handleCancel={handleCancel} footer={null}>
        <h5 className="modal-info remote-table-header">
          <span className="mNone">장비 선택 후 일정을 확인/입력 해주세요.</span>
        </h5>

        <h5 className="modal-info remote-table-header" style={{ flexDirection: 'row' }}>
          <span className="mNone">쿨링팬 번호</span>
          <Checkbox.Group
            options={remoteOperationFanOptions}
            defaultValue={selectedFans}
            value={selectedFans}
            onChange={handleChangeSelectedFans}
            className="checkbox-group"
          />
        </h5>
        <ConfigProvider locale={koKR}>
          <Calendar
            cellRender={dateCellRender}
            fullscreen={false}
            value={selectedDate}
            onSelect={(date, { source }) => {
              if (source === 'date') {
                handleChangeSelectDate(date);
              }
            }}
            onPanelChange={handleChangeDate}
          />
        </ConfigProvider>
        <div className="range-select-box">
          <span className="comments">날짜 범위 </span>
          <DatePicker
            onChange={value => setStartDate(value)}
            value={startDate}
            className="w-100"
            placeholder="시작일"
            minDate={dayjs(new Date().setDate(new Date().getDate()))}
          />
          ~
          <DatePicker
            onChange={value => setEndDate(value)}
            value={endDate}
            className="w-100"
            placeholder="종료일"
            minDate={startDate}
          />
        </div>
        <div className="schedule-boxes">
          <span className="comments2">작동 일정(시:분)</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {times.map((time, index) => (
              <Input
                key={index}
                className="form-control"
                placeholder="%H:%M"
                type="text"
                value={time}
                maxLength={7}
                onChange={e => handleChangeTime(index, e.target.value)}
                style={{ padding: '10px', textAlign: 'center' }}
              />
            ))}
          </div>
        </div>
        <div className="schedule-boxes">
          <span className="comments3">시간 및 설명</span>
          <Input
            className="form-control"
            placeholder="작동(분)"
            type="text"
            maxLength={5}
            value={runTime}
            onChange={e => setRunTime(Number(e.target.value))}
          />
          <Input
            className="form-control"
            placeholder="설명을 입력하세요."
            type="text"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <Button type="primary" onClick={handleAddSchedule}>
            추가
          </Button>
        </div>
      </Modal>
      <Modal
        title=""
        isModalVisible={isDetailModalOpen}
        handleCancel={handleCancelDetailModal}
        footer={
          detailEvent.length ? (
            <Button color="danger" className="danger-button" onClick={handleClickDeleteDetailSchedule}>
              삭제
            </Button>
          ) : (
            <></>
          )
        }
        style={{ top: '30%', padding: '0 20px' }}>
        <div className="event-wrapper">
          {detailEvent.length ? (
            detailEvent.map(it => (
              <div key={it.no} className="detail-event-box">
                <Checkbox
                  id={`checkbox-${it.no}`}
                  className="mr-1 d-flex"
                  value={it.no}
                  checked={isCheckedList.includes(it.no)}
                  onChange={e => {
                    handleCheckbox(e.target.checked, it.no);
                  }}></Checkbox>
                <label htmlFor={`checkbox-${it.no}`} className="w-100 cursor-pointer">
                  <div className="d-flex align-center justify-space-between w-100">
                    <div className="event-hour">{it.time}</div>
                    <div className="event-date">{it.fans} </div>
                    <div className="event-summary">{it.comment}</div>
                  </div>
                </label>
              </div>
            ))
          ) : (
            <div>해당 날짜에 원격 일정이 없어요.</div>
          )}
        </div>
      </Modal>
    </div>
  );
};
export default RemoteScheduleModal;
