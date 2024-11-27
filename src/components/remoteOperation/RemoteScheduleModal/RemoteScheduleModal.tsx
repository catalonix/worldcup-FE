import React, { useEffect, useState } from 'react';
import Modal from 'components/common/Modal';
import { Button, Calendar, Checkbox, DatePicker, GetProp, Input } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import { remoteOperationFanOptions } from 'common/constants/remoteOperations';

interface RemoteScheduleModalProps {
  isModalVisible: boolean;
  handleIsModalVisible: (value: boolean) => void;
}

dayjs.locale('ko');

const RemoteScheduleModal = (props: RemoteScheduleModalProps) => {
  const [selectedFans, setSelectedFans] = useState<string[]>();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate())));
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate())));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate())));
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const handleChangeSelectedFans: GetProp<typeof Checkbox.Group, 'onChange'> = checkedValues => {
    setSelectedFans(checkedValues as string[]);
  };

  const handleCancel = () => {
    props.handleIsModalVisible(false);
  };

  const search = () => {
    // TODO: 원격작동 일정 조회
  };

  // TODO: 해당 날에 일정이 있으면 모달 오픈
  const handleChangeSelectDate = (value: Dayjs) => {
    console.log('value', value);
    setSelectedDate(value);

    setIsDetailModalOpen(true);
  };

  useEffect(() => {
    if (props.isModalVisible) {
      search();
    }
  }, [props.isModalVisible]);
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
            onChange={handleChangeSelectedFans}
            className="checkbox-group"
          />
        </h5>
        <Calendar fullscreen={false} value={selectedDate} onChange={handleChangeSelectDate} />
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
        handleCancel={() => setIsDetailModalOpen(false)}
        footer={
          <Button color="danger" className="danger-button">
            삭제
          </Button>
        }
        style={{ top: '30%', padding: '0 20px' }}></Modal>
    </div>
  );
};
export default RemoteScheduleModal;
