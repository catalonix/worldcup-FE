import React from 'react';
import Card from 'components/common/Card';
import RemoteInfo from 'components/remoteOperation/RemoteInfo';
import StadiumWatering from 'components/remoteOperation/StadiumWatering';
import FanTable from 'components/remoteOperation/FanTable';
import { Button } from 'antd';
import FanControl from 'components/remoteOperation/FanControl';

const RemoteOperation = () => {
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
          <StadiumWatering />
        </Card>
        <Card title="원격작동 상세정보">
          <RemoteInfo keyString="irrigation" />
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
              <Button>원격작동 일정 관리</Button>
            </div>
          }>
          <FanControl />
        </Card>
      </div>
    </div>
  );
};
export default RemoteOperation;
