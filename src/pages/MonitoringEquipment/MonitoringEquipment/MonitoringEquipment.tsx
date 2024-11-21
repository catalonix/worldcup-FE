import React, { useEffect } from 'react';
import Card from 'components/common/Card';
import useSensor from 'hooks/useSensor';
const MonitoringEquipment = () => {
  const { getSensorStatus, sensorStatus } = useSensor();

  useEffect(() => {
    getSensorStatus();
  }, []);
  return (
    <div className="monitoring-equipment-container">
      <Card title="NDVI카메라">
        <div>
          <div className="card-content card-content-list-height">
            {sensorStatus?.camera.map(it => {
              const statusClass =
                it.status === 'OFFLINE' ? 'situation-danger' : it.status === 'ONLINE' ? 'situation-success' : '';

              return (
                <div className="card-condition-list" id={it.code} key={it.code}>
                  <div className="condition-list-title">
                    <span
                      className={`condition-weird ${
                        it.status === 'ONLINE'
                          ? 'condition-normal'
                          : it.status === 'OFFLINE'
                            ? 'condition-weird'
                            : 'condition-none'
                      }`}></span>
                    <h4>{it.name}</h4>
                  </div>
                  <p className="progress-step">{it.action}</p>
                  <div className={`condition-text-box ${statusClass}`}>
                    <span>{it.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
      <Card title="기상센서">
        <div className="card-body">
          <div className="card-content card-content-list-height">
            {sensorStatus?.weather.map(it => {
              const statusClass =
                it.status === 'OFFLINE' ? 'situation-danger' : it.status === 'ONLINE' ? 'situation-success' : '';
              return (
                <div className="card-condition-list" id={it.code} key={it.code}>
                  <div className="condition-list-title">
                    <span
                      className={`condition-weird ${
                        it.status === 'ONLINE'
                          ? 'condition-normal'
                          : it.status === 'OFFLINE'
                            ? 'condition-weird'
                            : 'condition-none'
                      }`}></span>
                    <h4>{it.name}</h4>
                  </div>
                  <p className="progress-step">{it.action}</p>
                  <div className={`condition-text-box ${statusClass}`}>
                    <span>{it.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
      <Card title="토양로봇">
        <div className="card-body">
          <div className="card-content card-content-list-height">
            <div className="robot-situation">
              <h5>현재 상태 : </h5>
              <div className="robot-situation-data">
                <span className="condition-weird"></span>
                <h4>OFFLINE</h4>
              </div>
            </div>
            <div className="robot-data mb-3">
              <div className="robot-data-type">
                <div className="robot-data-type-title">
                  <div className="robot-data-type-iconbox">
                    <i className="wi wi-thermometer"></i>
                  </div>
                  <div className="robot-data-type-text">
                    <h4>토양온도</h4>
                    <p>Temperature</p>
                  </div>
                </div>
                <h5>
                  <span
                    className={`condition-text-box ${
                      sensorStatus?.soil.temp.grade === '매우높음'
                        ? 'situation-temperature-veryhigh'
                        : sensorStatus?.soil.temp.grade === '높음'
                          ? 'situation-temperature-high'
                          : sensorStatus?.soil.temp.grade === '양호'
                            ? 'situation-temperature-middle'
                            : sensorStatus?.soil.temp.grade === '낮음'
                              ? 'situation-temperature-low'
                              : sensorStatus?.soil.temp.grade === '매우낮음'
                                ? 'situation-temperature-verylow'
                                : ''
                    }`}>
                    {sensorStatus?.soil.temp.grade}
                  </span>
                </h5>
                <h4 id="STP">
                  {sensorStatus?.soil.temp.value}
                  <span>ºC</span>
                </h4>
              </div>
            </div>
            <div className="robot-data">
              <div className="robot-data-type">
                <div className="robot-data-type-title">
                  <div className="robot-data-type-iconbox">
                    <i className="wi wi-humidity"></i>
                  </div>
                  <div className="robot-data-type-text">
                    <h4>토양습도</h4>
                    <p>Humidity</p>
                  </div>
                </div>
                <h5>
                  <span
                    className={`condition-text-box ${
                      sensorStatus?.soil.humi.grade === '매우높음'
                        ? 'situation-humidity-veryhigh'
                        : sensorStatus?.soil.humi.grade === '높음'
                          ? 'situation-humidity-high'
                          : sensorStatus?.soil.humi.grade === '양호'
                            ? 'situation-humidity-middle'
                            : sensorStatus?.soil.humi.grade === '낮음'
                              ? 'situation-humidity-low'
                              : sensorStatus?.soil.humi.grade === '매우낮음'
                                ? 'situation-humidity-verylow'
                                : ''
                    }`}>
                    {sensorStatus?.soil.humi.grade}
                  </span>
                </h5>
                <h4 id="SMO">
                  {sensorStatus?.soil.humi.value}
                  <span>%</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MonitoringEquipment;
