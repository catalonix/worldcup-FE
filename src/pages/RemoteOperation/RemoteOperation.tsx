import React, { useEffect, useState } from 'react';
import Card from 'components/common/Card';
import RemoteInfo from 'components/remoteOperation/RemoteInfo';
import StadiumWatering from 'components/remoteOperation/StadiumWatering';
import FanTable from 'components/remoteOperation/FanTable';
import { Button } from 'antd';
import FanControl from 'components/remoteOperation/FanControl';
import { FanList, GetIrrigationResponseType } from 'shared/api/operation/operationAPIService.types';
import RemoteScheduleModal from 'components/remoteOperation/RemoteScheduleModal';
import useOperation from 'hooks/useOperation';

const RemoteOperation = () => {
  const { getIrrigation } = useOperation();
  const [selectedKey, setSelectedKey] = useState<FanList>('binary_sensor.fan04');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [mode, setMode] = useState<'program' | 'unit'>('program');
  const [irrigation, setIrrigation] = useState<GetIrrigationResponseType>();

  const handleIsModalVisible = (isModalVisible: boolean) => {
    setIsModalVisible(isModalVisible);
  };

  const search = async () => {
    const res = await getIrrigation();
    setIrrigation(res);
  };

  const handleChangeMode = (mode: 'unit' | 'program') => {
    setMode(mode);
    search();
  };

  useEffect(() => {
    console.log('se', selectedKey);
  }, [selectedKey]);

  useEffect(() => {
    search();
  }, []);

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
          title={
            <div className="d-flex ga-1 align-center">
              <div>관수제어</div>
              <div className="d-flex ga-1">
                <Button onClick={() => handleChangeMode('program')} type={mode === 'program' ? 'primary' : 'default'}>
                  프로그램
                </Button>
                <Button onClick={() => handleChangeMode('unit')} type={mode === 'unit' ? 'primary' : 'default'}>
                  개별제어
                </Button>
              </div>
            </div>
          }
          titleButton={
            <div>
              <Button>원격제어</Button>
              <Button>개별제어</Button>
            </div>
          }>
          <FanTable type={mode} data={irrigation} />
        </Card>
        <Card
          title="쿨링팬제어"
          titleButton={
            <div>
              <Button color="danger" className="danger-button mr-1">
                모두 정지
              </Button>
              <Button onClick={() => handleIsModalVisible(true)} type="primary">
                {' '}
                원격작동 일정 관리
              </Button>
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
