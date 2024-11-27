import React, { useEffect, useState } from 'react';
import wateringIcon from 'common/assets/img/watering-icon.png';
import stadiumRemote from 'common/assets/img/stadium-remote.png';
import useOperation from 'hooks/useOperation';
import { FanList, GetRemoteStatusResponseType } from 'shared/api/operation/operationAPIService.types';

interface StadiumWateringProps {
  selectedKey: FanList;
  setSelectedKey: React.Dispatch<React.SetStateAction<FanList>>;
}

const StadiumWatering = (props: StadiumWateringProps) => {
  const { getRemoteStatus } = useOperation();

  const [remoteStatus, setRemoteStatus] = useState<GetRemoteStatusResponseType>();

  const search = async () => {
    const res = await getRemoteStatus();
    setRemoteStatus(res);
  };

  const getStatus = (fan: FanList) => {
    const res = remoteStatus?.find(it => it.key === fan);
    return res?.state === 'on' ? 'working' : 'stop';
  };

  const handleClick = (fan: FanList) => {
    props.setSelectedKey(fan);
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <>
      <div className="stadium-watering">
        <div className="stadium-watering-row flex-bottom">
          <div className="watering-box water-off" data-water="1">
            <div className="watering-icon">
              <img src={wateringIcon} alt="watering-icon" />
            </div>
            <h4 className="watering-number"> 1 </h4>
          </div>
          <div className="watering-box water-off" data-water="2">
            <div className="watering-icon">
              <img src={wateringIcon} alt="watering-icon" />
            </div>
            <h4 className="watering-number"> 2 </h4>
          </div>
          <div className="watering-box water-off" data-water="3">
            <div className="watering-icon">
              <img src={wateringIcon} alt="watering-icon" />
            </div>
            <h4 className="watering-number"> 3 </h4>
          </div>
          <div className="watering-box water-off" data-water="4">
            <div className="watering-icon">
              <img src={wateringIcon} alt="watering-icon" />
            </div>
            <h4 className="watering-number"> 4 </h4>
          </div>
          <div className="watering-box water-off" data-water="5">
            <div className="watering-icon">
              <img src={wateringIcon} alt="watering-icon" />
            </div>
            <h4 className="watering-number"> 5 </h4>
          </div>
        </div>
        <div className="stadium-watering-row flex-center">
          <div className="watering-box water-off" data-water="6">
            <div className="watering-icon">
              <img src={wateringIcon} alt="watering-icon" />
            </div>
            <h4 className="watering-number"> 6 </h4>
          </div>
          <div className="watering-box water-off" data-water="7">
            <div className="watering-icon">
              <img src={wateringIcon} alt="watering-icon" />
            </div>
            <h4 className="watering-number"> 7 </h4>
          </div>
          <div className="watering-box water-off" data-water="8">
            <div className="watering-icon">
              <img src={wateringIcon} alt="watering-icon" />
            </div>
            <h4 className="watering-number"> 8 </h4>
          </div>
          <div className="watering-box water-off" data-water="9">
            <div className="watering-icon">
              <img src={wateringIcon} alt="watering-icon" />
            </div>
            <h4 className="watering-number"> 9 </h4>
          </div>
          <div className="watering-box water-off" data-water="10">
            <div className="watering-icon">
              <img src={wateringIcon} alt="watering-icon" />
            </div>
            <h4 className="watering-number">10</h4>
          </div>
        </div>
        <div className="stadium-watering-row flex-top">
          <div className="watering-box water-off" data-water="11">
            <div className="watering-icon">
              <img src={wateringIcon} alt="watering-icon" />
            </div>
            <h4 className="watering-number">11</h4>
          </div>
          <div className="watering-box water-off" data-water="12">
            <div className="watering-icon">
              <img src={wateringIcon} alt="watering-icon" />
            </div>
            <h4 className="watering-number">12</h4>
          </div>
          <div className="watering-box water-off" data-water="13">
            <div className="watering-icon">
              <img src={wateringIcon} alt="watering-icon" />
            </div>
            <h4 className="watering-number">13</h4>
          </div>
          <div className="watering-box water-off" data-water="14">
            <div className="watering-icon">
              <img src={wateringIcon} alt="watering-icon" />
            </div>
            <h4 className="watering-number">14</h4>
          </div>
          <div className="watering-box water-off" data-water="15">
            <div className="watering-icon">
              <img src={wateringIcon} alt="watering-icon" />
            </div>
            <h4 className="watering-number">15</h4>
          </div>
        </div>
      </div>
      <div className="stadium-remote-map position-relative">
        <img src={stadiumRemote} />
        <ul className="nav nav-tabs nav-tabs-solid nav-justified border-0">
          <li className="nav-item mr-2 robot-tab" onClick={() => handleClick('person.robot')}>
            <a
              href="#airblower-tab-1"
              className={`remote-tab-link wd-100p ${props.selectedKey === 'person.robot' ? 'active' : ''}`}
              data-toggle="tab"
              id="robot">
              <div className={`remote-situation tab-${getStatus('person.robot')}`}></div>
              <span>토양로봇</span>
            </a>
          </li>
          <li className="nav-item mr-2 airblower-tab1" onClick={() => handleClick('binary_sensor.fan04')}>
            <a
              href="#airblower-tab-1"
              className={`remote-tab-link wd-100p ${props.selectedKey === 'binary_sensor.fan04' ? 'active' : ''}`}
              data-toggle="tab"
              id="FAN04">
              <div className={`remote-situation tab-${getStatus('binary_sensor.fan04')}`}></div>
              <span>쿨링팬 4</span>
            </a>
          </li>
          <li className="nav-item mr-2 airblower-tab2" onClick={() => handleClick('binary_sensor.fan08')}>
            <a
              href="#airblower-tab-1"
              className={`remote-tab-link wd-100p ${props.selectedKey === 'binary_sensor.fan08' ? 'active' : ''}`}
              data-toggle="tab"
              id="FAN08">
              <div className={`remote-situation tab-${getStatus('binary_sensor.fan08')}`}></div>
              <span>쿨링팬 8</span>
            </a>
          </li>
          <li className="nav-item mr-2 airblower-tab3" onClick={() => handleClick('binary_sensor.fan10')}>
            <a
              href="#airblower-tab-1"
              className={`remote-tab-link wd-100p ${props.selectedKey === 'binary_sensor.fan10' ? 'active' : ''}`}
              data-toggle="tab"
              id="FAN10">
              <div className={`remote-situation tab-${getStatus('binary_sensor.fan10')}`}></div>
              <span>쿨링팬 1</span>
            </a>
          </li>
          <li className="nav-item mr-2 airblower-tab4" onClick={() => handleClick('binary_sensor.fan05')}>
            <a
              href="#airblower-tab-1"
              className={`remote-tab-link wd-100p ${props.selectedKey === 'binary_sensor.fan05' ? 'active' : ''}`}
              data-toggle="tab"
              id="FAN05">
              <div className={`remote-situation tab-${getStatus('binary_sensor.fan05')}`}></div>
              <span>쿨링팬 5</span>
            </a>
          </li>
          <li className="nav-item mr-2 airblower-tab5" onClick={() => handleClick('binary_sensor.fan03')}>
            <a
              href="#airblower-tab-1"
              className={`remote-tab-link wd-100p ${props.selectedKey === 'binary_sensor.fan03' ? 'active' : ''}`}
              data-toggle="tab"
              id="FAN03">
              <div className={`remote-situation tab-${getStatus('binary_sensor.fan03')}`}></div>
              <span>쿨링팬 3</span>
            </a>
          </li>
          <li className="nav-item mr-2 airblower-tab6" onClick={() => handleClick('binary_sensor.fan02')}>
            <a
              href="#airblower-tab-1"
              className={`remote-tab-link wd-100p ${props.selectedKey === 'binary_sensor.fan02' ? 'active' : ''}`}
              data-toggle="tab"
              id="FAN02">
              <div className={`remote-situation tab-${getStatus('binary_sensor.fan02')}`}></div>
              <span>쿨링팬 2</span>
            </a>
          </li>
          <li className="nav-item mr-2 airblower-tab7" onClick={() => handleClick('binary_sensor.fan06')}>
            <a
              href="#airblower-tab-1"
              className={`remote-tab-link wd-100p ${props.selectedKey === 'binary_sensor.fan06' ? 'active' : ''}`}
              data-toggle="tab"
              id="FAN06">
              <div className={`remote-situation tab-${getStatus('binary_sensor.fan06')}`}></div>
              <span>쿨링팬 6</span>
            </a>
          </li>
          <li className="nav-item mr-2 airblower-tab8" onClick={() => handleClick('binary_sensor.fan07')}>
            <a
              href="#airblower-tab-1"
              className={`remote-tab-link wd-100p ${props.selectedKey === 'binary_sensor.fan07' ? 'active' : ''}`}
              data-toggle="tab"
              id="FAN07">
              <div className={`remote-situation tab-${getStatus('binary_sensor.fan07')}`}></div>
              <span>쿨링팬 7</span>
            </a>
          </li>
          <li className="nav-item mr-2 irrigation-tab" onClick={() => handleClick('irrigation')}>
            <a
              href="#airblower-tab-1"
              className={`remote-tab-link wd-100p ${props.selectedKey === 'irrigation' ? 'active' : ''}`}
              data-toggle="tab"
              id="FAN091">
              <div className={`remote-situation tab-${getStatus('irrigation')}`}></div>
              <span>관수</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default StadiumWatering;
