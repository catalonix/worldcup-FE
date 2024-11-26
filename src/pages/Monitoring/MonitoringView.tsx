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
                <div className="stadium-sensor-m sensor-top-m">
                  <div className="sensor-row">
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="31">
                        <div className="sensor-data">
                          <div className="sensor-humidity-data humidity-verylow"></div>
                          <div className="sensor-temperature-data temperature-low"></div>
                        </div>
                      </div>
                      <div className="sensor-info-box infoBox" style={{ left: '25px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>23.7%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>20.6ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.17</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:28</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="30"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '25px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>22.0%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>20.8ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.23</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:27</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="29"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '25px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>25.0%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>21.3ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>1.01</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:27</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="28"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '25px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>22.5%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>21.6ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.25</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:26</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="27"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '-15px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>22.0%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>21.0ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.45</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:26</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="26"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '-45px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>18.8%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>20.8ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.54</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:25</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sensor-row">
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="18"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '25px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>20.6%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>21.8ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.25</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:19</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="19"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '25px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>20.8%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>21.4ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.21</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:20</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="20"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '25px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>19.7%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>21.4ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.30</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:21</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="21"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '25px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>23.5%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>21.4ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.33</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:21</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="22"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '-15px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>19.4%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>21.6ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.27</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:22</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="23"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '-45px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>24.1%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>21.4ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.22</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:23</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="stadium-sensor-m sensor-bottom-m">
                  <div className="sensor-row">
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="14"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '25px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>23.0%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>21.4ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.15</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:17</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="13"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '25px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>20.4%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>21.0ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.34</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:16</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="12"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '25px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>18.7%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>20.7ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.42</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:15</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="15"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '25px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>18.8%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>21.2ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.37</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:17</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="11"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '-15px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>18.8%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>20.6ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.19</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:15</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="10"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '-45px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>19.1%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>20.6ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.33</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:14</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sensor-row">
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="02"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '25px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>17.1%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>21.7ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.24</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:08</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="03"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '25px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>15.9%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>20.7ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.26</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:09</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="04"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '25px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>16.0%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>21.0ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.26</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:10</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="05"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '25px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>18.0%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>20.1ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.26</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:10</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="06"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '-15px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>16.9%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>20.4ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.23</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:11</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="sensor-location">
                      <div className="sensor-btn" data-loc="07"></div>
                      <div className="sensor-info-box infoBox" style={{ left: '-45px', display: 'none' }}>
                        <div className="info-header">
                          <h4>토양정보</h4>
                          <button onClick={() => handleNavigate(AppPaths.SOIL_SUMMARY)}>
                            <i className="fe fe-more-vertical"></i>
                          </button>
                        </div>
                        <div className="info-body">
                          <ul>
                            <li>
                              <span>토양습도</span>
                              <span>16.9%</span>
                            </li>
                            <li>
                              <span>토양온도</span>
                              <span>20.4ºC</span>
                            </li>
                            <li>
                              <span>EC</span>
                              <span>0.32</span>
                            </li>
                            <li>
                              <span>일시</span>
                              <span>08:12</span>
                            </li>
                          </ul>
                        </div>
                      </div>
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
