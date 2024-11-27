import React, { useEffect, useState } from 'react';
import Card from 'components/common/Card';
import RemoteInfo from 'components/remoteOperation/RemoteInfo';
import StadiumWatering from 'components/remoteOperation/StadiumWatering';
import FanTable from 'components/remoteOperation/FanTable';
import { Button } from 'antd';
import FanControl from 'components/remoteOperation/FanControl';
import { FanList } from 'shared/api/operation/operationAPIService.types';
import RemoteScheduleModal from 'components/remoteOperation/RemoteScheduleModal';

const RemoteOperation = () => {
  const [selectedKey, setSelectedKey] = useState<FanList>('binary_sensor.fan04');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleIsModalVisible = (isModalVisible: boolean) => {
    setIsModalVisible(isModalVisible);
  };

  useEffect(() => {
    console.log('se', selectedKey);
  }, [selectedKey]);

  return (
    <div className="remote-operation-container">
      <div className="remote-operation-box">
        <Card
          title="원격작동 현황"
          titleButton={
            <div className="stadium-legend">
              <div className="legend-normal">
                <div></div>
                <span>작동중</span>
              </div>
              <div className="legend-weird">
                <div></div>
                <span>정지</span>
              </div>
            </div>
          }>
          <StadiumWatering selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
        </Card>
        <Card title="원격작동 상세정보">
          <RemoteInfo keyString={selectedKey} />
        </Card>
      </div>
      <div className="remote-operation-box">
        <Card
          title="관수제어"
          titleButton={
            <div>
              <Button>프로그램</Button>
              <Button>개별제어</Button>
            </div>
          }>
          <FanTable type="program" />
        </Card>
        <Card
          title="쿨링팬제어"
          titleButton={
            <div>
              <Button color="danger">모두 정지</Button>
              <Button onClick={() => handleIsModalVisible(true)}> 원격작동 일정 관리</Button>
            </div>
          }>
          <FanControl />
        </Card>
      </div>
      <RemoteScheduleModal isModalVisible={isModalVisible} handleIsModalVisible={handleIsModalVisible} />
    </div>
  );
};
export default RemoteOperation;
