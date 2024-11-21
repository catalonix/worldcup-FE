import React from 'react';
import Card from 'components/common/Card';
import './MonitoringEquipment.scss';
const MonitoringEquipment = () => {
  return (
    <div className="monitoring-equipment-container">
      <Card title="NDVI카메라">
        <div>
          <div className="card-content card-content-list-height">
            <div className="card-condition-list" id="C001">
              <div className="condition-list-title">
                <span className="condition-weird"></span>
                <h4>동측 카메라</h4>
              </div>
              <p className="progress-step">수리중</p>
              <div className="condition-text-box situation-danger">
                <span>OFFLINE</span>
              </div>
            </div>
            <div className="card-condition-list" id="C002">
              <div className="condition-list-title">
                <span className="condition-normal"></span>
                <h4>남측 카메라</h4>
              </div>
              <p className="progress-step">작동중</p>
              <div className="condition-text-box situation-success">
                <span>정상</span>
              </div>
            </div>
            <div className="card-condition-list" id="C003">
              <div className="condition-list-title">
                <span className="condition-weird"></span>
                <h4>서측 카메라</h4>
              </div>
              <p className="progress-step">수리중</p>
              <div className="condition-text-box situation-danger">
                <span>OFFLINE</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card title="기상센서">
        <div className="card-body">
          <div className="card-content card-content-list-height">
            <div className="card-condition-list" id="W001">
              <div className="condition-list-title">
                <span className="condition-normal"></span>
                <h4>동남기상센서</h4>
              </div>
              <p className="progress-step">작동중</p>
              <div className="condition-text-box situation-success">
                <span>정상</span>
              </div>
            </div>
            <div className="card-condition-list" id="W002">
              <div className="condition-list-title">
                <span className="condition-normal"></span>
                <h4>서북기상센서</h4>
              </div>
              <p className="progress-step">작동중</p>
              <div className="condition-text-box situation-success">
                <span>정상</span>
              </div>
            </div>
            <div className="card-condition-list" id="W003">
              <div className="condition-list-title">
                <span className="condition-normal"></span>
                <h4>서남기상센서</h4>
              </div>
              <p className="progress-step">작동중</p>
              <div className="condition-text-box situation-success">
                <span>정상</span>
              </div>
            </div>
            <div className="card-condition-list" id="W004">
              <div className="condition-list-title">
                <span className="condition-normal"></span>
                <h4>동북기상센서</h4>
              </div>
              <p className="progress-step">작동중</p>
              <div className="condition-text-box situation-success">
                <span>정상</span>
              </div>
            </div>
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
                  <span className="situation-temperature-middle">양호</span>
                </h5>
                <h4 id="STP">
                  16.3<span>ºC</span>
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
                  <span className="situation-humidity-low">낮음</span>
                </h5>
                <h4 id="SMO">
                  15.5<span>%</span>
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
