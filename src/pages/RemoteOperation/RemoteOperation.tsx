import React from 'react';
import Card from 'components/common/Card';
import RemoteInfo from 'components/remoteOperation/RemoteInfo';
import StadiumWatering from 'components/remoteOperation/StadiumWatering';

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
          <RemoteInfo />
        </Card>
      </div>
      <div className="remote-operation-box">
        <Card title="관수제어"></Card>
        <Card title="쿨링팬제어"></Card>
      </div>
    </div>
  );
};
export default RemoteOperation;
