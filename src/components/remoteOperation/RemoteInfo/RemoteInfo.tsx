import React from 'react';
import airblowerIcon from 'common/assets/img/airblower-icon.png';

const RemoteInfo = () => {
  return (
    <>
      <div className="remote-info">
        <div className="remote-title">
          <div className="title-icon-box mr-2">
            <img src={airblowerIcon} />
          </div>
          <h2 id="remoteName">쿨링팬 5</h2>
          <div className="remote-situation-data">
            <span className="condition-normal"></span>
            <h4>작동중</h4>
          </div>
        </div>
        <h4>
          <span className="recent-time">최근 가동 : 2024-10-15 12:59:05</span>
          <span>│</span>
          <span className="reservation-time">예약 가동 : </span>
        </h4>
      </div>
      <div className="remote-time">
        <div className="remote-time-info">
          <span>작동시간</span>
          <h4 id="time">-분</h4>
        </div>
        <div className="remote-time-info">
          <span>작동현황</span>
          <h4 id="state" className="off">
            정지
          </h4>
        </div>
      </div>
    </>
  );
};
export default RemoteInfo;
