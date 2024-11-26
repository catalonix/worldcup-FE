import React, { useEffect, useState } from 'react';
import airblowerIcon from 'common/assets/img/airblower-icon.png';
import useOperation from 'hooks/useOperation';
import { FanList, GetOperationDetailResponseType } from 'shared/api/operation/operationAPIService.types';

interface RemoteInfoProps {
  keyString: FanList;
}
const RemoteInfo = (props: RemoteInfoProps) => {
  const { getRemoteDetail } = useOperation();
  const [remoteInfo, setRemoteInfo] = useState<GetOperationDetailResponseType>({} as GetOperationDetailResponseType);

  const search = async () => {
    const res = await getRemoteDetail(props.keyString);
    setRemoteInfo(res);
  };

  useEffect(() => {
    console.log('props.keyString', props.keyString);
    search();
  }, [props.keyString]);

  return (
    <>
      <div className="remote-info">
        <div className="remote-title">
          <div className="title-icon-box mr-2">
            <img src={airblowerIcon} />
          </div>
          <h2 id="remoteName">{remoteInfo.name}</h2>
        </div>
        <h4>
          <span className="recent-time">최근 가동 : {remoteInfo.lastChanged}</span>
          <span>│</span>
          <span className="reservation-time">예약 가동 : {remoteInfo.schedule ? remoteInfo.schedule : '-'}</span>
        </h4>
      </div>
      <div className="remote-time">
        <div className="remote-time-info">
          <span>작동시간</span>
          <h4 id="time">{remoteInfo.operationTime ? remoteInfo.operationTime : '-'}분</h4>
        </div>
        <div className="remote-time-info">
          <span>작동현황</span>
          <h4 id="state" className={remoteInfo.state}>
            {remoteInfo.state === 'on' ? '작동중' : '정지'}
          </h4>
        </div>
      </div>
    </>
  );
};
export default RemoteInfo;
