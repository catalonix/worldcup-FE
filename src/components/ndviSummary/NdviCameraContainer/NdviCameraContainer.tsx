import React from 'react';

const NdviCameraContainer = () => {
  return (
    <div className="ndvi-container">
      <div className="ndvi-camera">
        <div className="card-header">동측 카메라</div>
        <div className="ndvi-camera__body">
          <div className="ndvi-value">
            <div className="ndvi-now">
              <h5>현재 식생지수</h5>
              <div className="now-value">
                <h4 id="ndvi1">0.732</h4>
                <span className="situation-success">양호</span>
              </div>
            </div>
            <div className="ndvi-now">
              <h5 style={{ textAlign: 'center' }}>최종 데이터 측정일시</h5>
              <div className="now-value">
                <h4 id="ndviDate">
                  2024-07-20 <br className="mobileBr" />
                  13:00
                </h4>
              </div>
            </div>
            <div className="ndvi-prediction">
              <h5>예측 식생지수</h5>
              <div className="prediction-value">
                <h4 id="ndvi2">0.750</h4>
                <span className="situation-success">양호</span>
              </div>
            </div>
          </div>
          <div>
            <img
              id="ndviImg1"
              src="https://seoul.fieldon.io/data13/C001/catalonix_show_daily_img.jpg "
              className="ndvi-img twentytwenty-before"
              width="100%"
            />
          </div>
        </div>
      </div>
      <div className="ndvi-camera">
        <div className="card-header">남측 카메라</div>
        <div className="ndvi-camera__body">
          <div className="ndvi-value">
            <div className="ndvi-now">
              <h5>현재 식생지수</h5>
              <div className="now-value">
                <h4 id="ndvi1">0.732</h4>
                <span className="situation-success">양호</span>
              </div>
            </div>
            <div className="ndvi-now">
              <h5 style={{ textAlign: 'center' }}>최종 데이터 측정일시</h5>
              <div className="now-value">
                <h4 id="ndviDate">
                  2024-07-20 <br className="mobileBr" />
                  13:00
                </h4>
              </div>
            </div>
            <div className="ndvi-prediction">
              <h5>예측 식생지수</h5>
              <div className="prediction-value">
                <h4 id="ndvi2">0.750</h4>
                <span className="situation-success">양호</span>
              </div>
            </div>
          </div>
          <div>
            <img
              id="ndviImg1"
              src="https://seoul.fieldon.io/data13/C001/catalonix_show_daily_img.jpg "
              className="ndvi-img twentytwenty-before"
              width="100%"
            />
          </div>
        </div>
      </div>
      <div className="ndvi-camera">
        <div className="card-header">서측 카메라</div>
        <div className="ndvi-camera__body">
          <div className="ndvi-value">
            <div className="ndvi-now">
              <h5>현재 식생지수</h5>
              <div className="now-value">
                <h4 id="ndvi1">0.732</h4>
                <span className="situation-success">양호</span>
              </div>
            </div>
            <div className="ndvi-now">
              <h5 style={{ textAlign: 'center' }}>최종 데이터 측정일시</h5>
              <div className="now-value">
                <h4 id="ndviDate">
                  2024-07-20 <br className="mobileBr" />
                  13:00
                </h4>
              </div>
            </div>
            <div className="ndvi-prediction">
              <h5>예측 식생지수</h5>
              <div className="prediction-value">
                <h4 id="ndvi2">0.750</h4>
                <span className="situation-success">양호</span>
              </div>
            </div>
          </div>
          <div>
            <img
              id="ndviImg1"
              src="https://seoul.fieldon.io/data13/C001/catalonix_show_daily_img.jpg "
              className="ndvi-img twentytwenty-before"
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NdviCameraContainer;
