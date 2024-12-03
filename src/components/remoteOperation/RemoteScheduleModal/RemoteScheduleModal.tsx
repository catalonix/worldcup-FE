import React, { useEffect, useMemo, useState } from 'react';
import Modal from 'components/common/Modal';
import { Badge, Button, Calendar, Checkbox, DatePicker, GetProp, Input } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import { remoteOperationFanOptions } from 'common/constants/remoteOperations';
import useOperation from 'hooks/useOperation';
import { DetailFan } from 'shared/api/operation/operationAPIService.types';

interface RemoteScheduleModalProps {
  isModalVisible: boolean;
  handleIsModalVisible: (value: boolean) => void;
}

dayjs.locale('ko');

const RemoteScheduleModal = (props: RemoteScheduleModalProps) => {
  const { getFanSchedule, getDetailFanSchedule, deleteDetailFanSchedule } = useOperation();
  const [selectedFans, setSelectedFans] = useState<string[]>(['1', '2']);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate())));
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate())));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate())));
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [events, setEvents] = useState<string[]>([]);
  const [detailEvent, setDetailEvent] = useState<DetailFan[]>([]);
  const [isCheckedList, setIsCheckedList] = useState<number[]>([]); // 선택된 항목 번호 배열

  const handleChangeSelectedFans: GetProp<typeof Checkbox.Group, 'onChange'> = checkedValues => {
    setSelectedFans(checkedValues as string[]);
  };

  const handleCancel = () => {
    setIsCheckedList([]);
    props.handleIsModalVisible(false);
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
        <Calendar
          cellRender={dateCellRender}
          fullscreen={false}
          value={selectedDate}
          onSelect={(date, { source }) => {
            if (source === 'date') {
              console.log('Panel Select:', source);
              handleChangeSelectDate(date);
            }
          }}
          onPanelChange={handleChangeDate}
        />
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
          <Input className="form-control" placeholder="" type="text" name="timeList[]" maxLength={5} />
          <Input className="form-control" placeholder="" type="text" name="timeList[]" maxLength={5} />
          <Input className="form-control" placeholder="" type="text" name="timeList[]" maxLength={5} />
          <Input className="form-control" placeholder="" type="text" name="timeList[]" maxLength={5} />
          <Input className="form-control" placeholder="" type="text" name="timeList[]" maxLength={5} />
        </div>
        <div className="schedule-boxes">
          <span className="comments3">시간 및 설명</span>
          <Input className="form-control" placeholder="작동(분)" type="text" name="timeList[]" maxLength={5} />
          <Input
            className="form-control"
            placeholder="설명을 입력하세요."
            type="text"
            name="timeList[]"
            maxLength={5}
          />
          <Button type="primary">추가</Button>
        </div>
      </Modal>
      <Modal
        title=""
        isModalVisible={isDetailModalOpen}
        handleCancel={handleCancelDetailModal}
        footer={
          <Button color="danger" className="danger-button" onClick={handleClickDeleteDetailSchedule}>
            삭제
          </Button>
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
