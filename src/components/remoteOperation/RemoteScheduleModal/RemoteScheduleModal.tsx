import React, { useEffect, useState } from 'react';
import Modal from 'components/common/Modal';
import { Checkbox, GetProp } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { remoteOperationFanOptions } from 'common/constants/remoteOperations';

interface RemoteScheduleModalProps {
  isModalVisible: boolean;
  handleIsModalVisible: (value: boolean) => void;
}

dayjs.locale('ko');

const RemoteScheduleModal = (props: RemoteScheduleModalProps) => {
  const [selectedFans, setSelectedFans] = useState<string[]>();
  const handleChangeSelectedFans: GetProp<typeof Checkbox.Group, 'onChange'> = checkedValues => {
    setSelectedFans(checkedValues as string[]);
  };

  const handleCancel = () => {
    props.handleIsModalVisible(false);
  };

  const search = () => {
    // TODO: 원격작동 일정 조회
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
      </Modal>
    </div>
  );
};
export default RemoteScheduleModal;
