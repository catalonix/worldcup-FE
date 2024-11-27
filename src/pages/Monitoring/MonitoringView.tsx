import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import { AppPaths } from 'app/routing/app-routing';
import airblowerIcon from 'common/assets/img/airblower-icon.png';
import wateringIcon from 'common/assets/img/watering-icon.png';
import stadium from 'common/assets/img/stadium.png';
import sensorIcon from 'common/assets/img/sensor-icon.png';
import cameraIcon from 'common/assets/img/camera-icon.png';
import useSensor from 'hooks/useSensor';
import LegendModal from 'components/Monitoring/LegendModal';
import { Button } from 'antd';

const MonitoringView = () => {
  const navigate = useNavigate();
  const { sensorSummary, getSensorSummary } = useSensor();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleNavigate = (to: string) => {
    navigate(to);
  };

  const handleIsModalVisible = (isModalVisible: boolean) => {
    setIsModalVisible(isModalVisible);
  };

  useEffect(() => {
    getSensorSummary();
  }, []);

  return (
    <div className="monitoring-view-container">
      <div className="row row-sm mt-4">
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div className="card custom-card overflow-hidden">
            <div className="card-header border-bottom-0 pb-0">
              <div>
                <div className="stadium-header">
                  <label className="main-content-label my-auto pt-2 tx-16">
                    경기장 장비현황
                    <h5 className="card-data">
                      측정일시 : <span id="tmFc">{sensorSummary?.date.replace('T', ' ')}</span>
                      <span id="ndviAvg"> / 식생지수 : {sensorSummary?.ndvi}</span>
                    </h5>
                  </label>
                  <div className="card-header-right">
                    <div className="stadium-legend">
                      <div className="legend-normal">
                        <div></div>
                        <span>정상작동</span>
                      </div>
                      <div className="legend-weird">
                        <div></div>
                        <span>이상</span>
                      </div>
                      <div className="legend-none">
                        <div></div>
                        <span>데이터없음</span>
                      </div>
                      <Button className="mobileBtn" onClick={() => handleIsModalVisible(true)}>
                        <InfoCircleOutlined /> 범례
                      </Button>
                    </div>

                    <div className="legend-modal-btn" onClick={() => handleIsModalVisible(true)}>
                      <Button className="trigger">
                        <InfoCircleOutlined /> 측정 범례
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body pt-1">
              <div className="stadium-img stadium-map">
                <img src={stadium} alt="stadium" />
                <div className="equipment-location">
                  {sensorSummary?.weather.map((it, idx) => {
                    const statusClass = it.status === 'OFFLINE' ? 'condition-weird' : 'condition-normal';
                    return (
                      <div className={`sensor-${idx + 1}`} key={it.code}>
                        <div className="equipment-btn-box">
                          <div className={`condition-icon ${statusClass}`}>
                            <img
                              src={sensorIcon}
                              onClick={() => handleNavigate(`${AppPaths.WEATHER_SUMMARY}?sensorCode=${it.code}`)}
                            />
                          </div>
                          <div className="equipment-title">
                            <a href={`weather-summary.html?sensorCode=${it.code}`} data-sensor={it.code}>
                              {it.name}
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {sensorSummary?.camera.map((it, idx) => {
                    const statusClass = it.status === 'OFFLINE' ? 'condition-weird' : 'condition-normal';
                    return (
                      <div className={`camera-${idx + 1}`} key={it.code}>
                        <div className="equipment-btn-box">
                          <div className={`condition-icon ${statusClass}`}>
                            <img
                              src={cameraIcon}
                              onClick={() => handleNavigate(`${AppPaths.NDVI_SUMMARY}?sensorNo=${it.code}`)}
                            />
                          </div>
                          <div className="equipment-title">
                            <a href={`ndvi-summary.html?sensorNo=${it.code}`} data-sensor={it.code}>
                              {it.name}
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {sensorSummary?.fan.map((it, idx) => {
                    const statusClass = it.state === 'off' ? 'condition-weird' : 'condition-normal';

                    return (
                      <div className={`fan-${idx + 1}`} key={it.key}>
                        <div className="equipment-btn-box">
                          <div className={`condition-icon ${statusClass}`}>
                            <img src={airblowerIcon} onClick={() => handleNavigate(AppPaths.REMOTE_OPERATION)} />
                          </div>
                          <div className="equipment-title">
                            <a href="./remote-operation.html">{it.name}</a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="stadium-sensor sensor-top">
                  <div className="sensor-row">
                    {sensorSummary?.sensor.slice(0, 6).map((it, index) => (
                      <div className="sensor-info" data-loc={it.loc_no} key={index}>
                        <div className="sensor-info-row mb-2">
                          <div className="sensor-humidity" style={{ backgroundColor: it.smo.backgroundColor }}>
                            <h5>습도</h5>
                            <h4>{it.smo?.value || 'N/A'} %</h4>
                          </div>
                          <div className="sensor-temperature" style={{ backgroundColor: it.stp.backgroundColor }}>
                            <h5>온도</h5>
                            <h4>{it.stp?.value || 'N/A'}ºC</h4>
                          </div>
                        </div>
                        <div className="sensor-info-row">
                          <div className="sensor-ec">
                            <h5>EC</h5>
                            <h4>{it.sec || 'N/A'}</h4>
                          </div>
                          <div className="sensor-ph">
                            <h5>일시</h5>
                            <h4>{it.tm.slice(11, 16) || 'N/A'}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="sensor-row">
                    {sensorSummary?.sensor.slice(6, 12).map((it, index) => (
                      <div className="sensor-info" data-loc={it.loc_no} key={index}>
                        <div className="sensor-info-row mb-2">
                          <div className="sensor-humidity" style={{ backgroundColor: it.smo.backgroundColor }}>
                            <h5>습도</h5>
                            <h4>{it.smo?.value || 'N/A'} %</h4>
                          </div>
                          <div className="sensor-temperature" style={{ backgroundColor: it.stp.backgroundColor }}>
                            <h5>온도</h5>
                            <h4>{it.stp?.value || 'N/A'}ºC</h4>
                          </div>
                        </div>
                        <div className="sensor-info-row">
                          <div className="sensor-ec">
                            <h5>EC</h5>
                            <h4>{it.sec || 'N/A'}</h4>
                          </div>
                          <div className="sensor-ph">
                            <h5>일시</h5>
                            <h4>{it.tm.slice(11, 16) || 'N/A'}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="stadium-sensor sensor-bottom">
                  <div className="sensor-row">
                    {sensorSummary?.sensor.slice(12, 18).map(it => (
                      <div className="sensor-info" data-loc={it.loc_no} key={it.loc_no}>
                        <div className="sensor-info-row mb-2">
                          <div className="sensor-humidity" style={{ backgroundColor: it.smo.backgroundColor }}>
                            <h5>습도</h5>
                            <h4>{it.smo?.value || 'N/A'} %</h4>
                          </div>
                          <div className="sensor-temperature" style={{ backgroundColor: it.stp.backgroundColor }}>
                            <h5>온도</h5>
                            <h4>{it.stp?.value || 'N/A'}ºC</h4>
                          </div>
                        </div>
                        <div className="sensor-info-row">
                          <div className="sensor-ec">
                            <h5>EC</h5>
                            <h4>{it.sec || 'N/A'}</h4>
                          </div>
                          <div className="sensor-ph">
                            <h5>일시</h5>
                            <h4>{it.tm.slice(11, 16) || 'N/A'}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="sensor-row">
                    {sensorSummary?.sensor.slice(18, 24).map(it => (
                      <div className="sensor-info" data-loc={it.loc_no} key={it.loc_no}>
                        <div className="sensor-info-row mb-2">
                          <div className="sensor-humidity" style={{ backgroundColor: it.smo.backgroundColor }}>
                            <h5>습도</h5>
                            <h4>{it.smo?.value || 'N/A'} %</h4>
                          </div>
                          <div className="sensor-temperature" style={{ backgroundColor: it.stp.backgroundColor }}>
                            <h5>온도</h5>
                            <h4>{it.stp?.value || 'N/A'}ºC</h4>
                          </div>
                        </div>
                        <div className="sensor-info-row">
                          <div className="sensor-ec">
                            <h5>EC</h5>
                            <h4>{it.sec || 'N/A'}</h4>
                          </div>
                          <div className="sensor-ph">
                            <h5>일시</h5>
                            <h4>{it.tm.slice(11, 16) || 'N/A'}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="stadium-watering">
                  <div className="stadium-watering-row flex-bottom">
                    <div className="watering-box">
                      <div className="watering-icon">
                        <img src={wateringIcon} alt="watering-icon" />
                      </div>
                      <h4 className="watering-number">1</h4>
                    </div>
                    <div className="watering-box">
                      <div className="watering-icon">
                        <img src={wateringIcon} alt="watering-icon" />
                      </div>
                      <h4 className="watering-number">2</h4>
                    </div>
                    <div className="watering-box">
                      <div className="watering-icon">
                        <img src={wateringIcon} alt="watering-icon" />
                      </div>
                      <h4 className="watering-number">3</h4>
                    </div>
                    <div className="watering-box">
                      <div className="watering-icon">
                        <img src={wateringIcon} alt="watering-icon" />
                      </div>
                      <h4 className="watering-number">4</h4>
                    </div>
                    <div className="watering-box">
                      <div className="watering-icon">
                        <img src={wateringIcon} alt="watering-icon" />
                      </div>
                      <h4 className="watering-number">5</h4>
                    </div>
                  </div>
                  <div className="stadium-watering-row flex-center">
                    <div className="watering-box">
                      <div className="watering-icon">
                        <img src={wateringIcon} alt="watering-icon" />
                      </div>
                      <h4 className="watering-number">6</h4>
                    </div>
                    <div className="watering-box">
                      <div className="watering-icon">
                        <img src={wateringIcon} alt="watering-icon" />
                      </div>
                      <h4 className="watering-number">7</h4>
                    </div>
                    <div className="watering-box">
                      <div className="watering-icon">
                        <img src={wateringIcon} alt="watering-icon" />
                      </div>
                      <h4 className="watering-number">8</h4>
                    </div>
                    <div className="watering-box">
                      <div className="watering-icon">
                        <img src={wateringIcon} alt="watering-icon" />
                      </div>
                      <h4 className="watering-number">9</h4>
                    </div>
                    <div className="watering-box">
                      <div className="watering-icon">
                        <img src={wateringIcon} alt="watering-icon" />
                      </div>
                      <h4 className="watering-number">10</h4>
                    </div>
                  </div>
                  <div className="stadium-watering-row flex-top">
                    <div className="watering-box">
                      <div className="watering-icon">
                        <img src={wateringIcon} alt="watering-icon" />
                      </div>
                      <h4 className="watering-number">11</h4>
                    </div>
                    <div className="watering-box">
                      <div className="watering-icon">
                        <img src={wateringIcon} alt="watering-icon" />
                      </div>
                      <h4 className="watering-number">12</h4>
                    </div>
                    <div className="watering-box">
                      <div className="watering-icon">
                        <img src={wateringIcon} alt="watering-icon" />
                      </div>
                      <h4 className="watering-number">13</h4>
                    </div>
                    <div className="watering-box">
                      <div className="watering-icon">
                        <img src={wateringIcon} alt="watering-icon" />
                      </div>
                      <h4 className="watering-number">14</h4>
                    </div>
                    <div className="watering-box">
                      <div className="watering-icon">
                        <img src={wateringIcon} alt="watering-icon" />
                      </div>
                      <h4 className="watering-number">15</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LegendModal isModalVisible={isModalVisible} handleIsModalVisible={handleIsModalVisible} />
    </div>
  );
};
export default MonitoringView;
