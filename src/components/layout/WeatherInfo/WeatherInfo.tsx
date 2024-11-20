import React from 'react';
import '../WeatherInfo/WeatherInfo.scss';

import { GetWeatherHeaderResponseType } from 'shared/api/sensor/sensorAPIService.types';

interface WeatherInfoInterface {
  weatherHeader: GetWeatherHeaderResponseType;
}

const WeatherInfo = (props: WeatherInfoInterface) => {
  return (
    <div className="weather-container">
      <div className="weather-box">
        <span>기온: {props.weatherHeader?.temp}</span>
      </div>
      <div className="weather-box">
        <span>강수량: 19.3</span>
      </div>
      <div className="weather-box">
        <span>습도: {props.weatherHeader?.humi}</span>
      </div>
      <div className="weather-box">
        <span>풍속: {props.weatherHeader?.ws}</span>
        <div className="weather-direction">{props.weatherHeader?.wd}</div>
      </div>
    </div>
  );
};
export default WeatherInfo;
