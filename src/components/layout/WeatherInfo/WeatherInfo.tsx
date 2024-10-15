import React from 'react';
import '../WeatherInfo/WeatherInfo.scss';

import { CloudOutlined } from '@ant-design/icons';

const WeatherInfo = () => {
  return (
    <div className="weather-container">
      <div className="weather-box">
        <CloudOutlined />
        <span>기온: 19.3</span>
      </div>
      <div className="weather-box">
        <span>강수량: 19.3</span>
      </div>
      <div className="weather-box">
        <span>습도: 19.3</span>
      </div>
      <div className="weather-box">
        <span>풍속: 19.3</span>
        <div className="weather-direction">북</div>
      </div>
    </div>
  );
};
export default WeatherInfo;
