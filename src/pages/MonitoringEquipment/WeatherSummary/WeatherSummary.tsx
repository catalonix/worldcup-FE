import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppPaths } from 'app/routing/app-routing';
import stadium from 'common/assets/img/stadium.png';
import sensorIcon from 'common/assets/img/sensor-icon.png';
import useSensor from 'hooks/useSensor';

const WeatherSummary = () => {
  const navigate = useNavigate();
  const { weatherSummary, getWeatherSummary } = useSensor();

  const handleNavigate = (to: string) => {
    navigate(to);
  };

  useEffect(() => {
    getWeatherSummary();
  }, []);

  return (
    <div className="weather-summary-container">
      <div className="row row-sm mt-4">
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div className="card custom-card overflow-hidden">
            <div className="card-header border-bottom-0 pb-0">
              <div>
                <div className="stadium-header">
                  <label className="main-content-label my-auto pt-2 tx-16">
                    경기장 장비현황
                    <h5 className="card-data">
                      측정일시 : <span id="tmFc">{weatherSummary?.date || '-'}</span>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body pt-1">
              <div className="stadium-img stadium-map">
                <img src={stadium} alt="stadium" />
                <div className="equipment-location">
                  <div className="sensor-1">
                    <div className="equipment-btn-box">
                      <div className="condition-icon condition-normal">
                        <img
                          src={sensorIcon}
                          onClick={() => handleNavigate(`${AppPaths.WEATHER_SUMMARY}?sensorCode=W001`)}
                        />
                      </div>
                      <div className="equipment-title">
                        <a href="weather-summary.html?sensorCode=W001" data-sensor="W001">
                          동북기상센서
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="sensor-2">
                    <div className="equipment-btn-box">
                      <div className="condition-icon condition-normal">
                        <img
                          src={sensorIcon}
                          onClick={() => handleNavigate(`${AppPaths.WEATHER_SUMMARY}?sensorCode=W004`)}
                        />
                      </div>
                      <div className="equipment-title">
                        <a href="weather-summary.html?sensorCode=W004" data-sensor="W004">
                          서북기상센서
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="sensor-3">
                    <div className="equipment-btn-box">
                      <div className="condition-icon condition-normal">
                        <img
                          src={sensorIcon}
                          onClick={() => handleNavigate(`${AppPaths.WEATHER_SUMMARY}?sensorCode=W003`)}
                        />
                      </div>
                      <div className="equipment-title">
                        <a href="weather-summary.html?sensorCode=W003" data-sensor="W003">
                          동남기상센서
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="sensor-4">
                    <div className="equipment-btn-box">
                      <div className="condition-icon condition-normal">
                        <img
                          src={sensorIcon}
                          onClick={() => handleNavigate(`${AppPaths.WEATHER_SUMMARY}?sensorCode=W002`)}
                        />
                      </div>
                      <div className="equipment-title">
                        <a href="weather-summary.html?sensorCode=W002" data-sensor="W002">
                          서남기상센서
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="stadium-sensor sensor-top">
                  <div className="sensor-row row">
                    <div className="sensor-info col-4" data-sensor="W001">
                      <div className="sensor-info-row mb-2">
                        <div className="sensor-temperature temp">
                          <h5>온도</h5>
                          <h4>
                            {weatherSummary?.value[0].temp}
                            <span className="unit"> ºC</span>
                          </h4>
                        </div>
                        <div className="sensor-temperature humi">
                          <h5>습도</h5>
                          <h4>
                            {weatherSummary?.value[0].humi}
                            <span className="unit"> %</span>
                          </h4>
                        </div>
                        <div className="sensor-temperature wd">
                          <h5>풍향</h5>
                          <h4> {weatherSummary?.value[0].wd}</h4>
                        </div>
                        <div className="sensor-temperature ws">
                          <h5>풍속</h5>
                          <h4>
                            {weatherSummary?.value[0].ws}
                            <span className="unit"> m/s</span>
                          </h4>
                        </div>
                      </div>
                      <div className="sensor-info-row">
                        <div className="sensor-ec pm10">
                          <h5>PM10</h5>
                          <h4>
                            {weatherSummary?.value[0].pm10.value}
                            <span id="pm10W001" className="pm-good pm-state ml-1">
                              {weatherSummary?.value[0].pm10.grade}
                            </span>
                          </h4>
                        </div>
                        <div className="sensor-ph pm25">
                          <h5>PM25</h5>
                          <h4>
                            {weatherSummary?.value[0].pm25.value}
                            <span id="pm25W001" className="pm-good pm-state ml-1">
                              {weatherSummary?.value[0].pm25.grade}
                            </span>
                          </h4>
                        </div>
                        <div className="sensor-ph co2">
                          <h5>CO2</h5>
                          <h4>
                            {weatherSummary?.value[0].co2}
                            <span className="unit"> ppm</span>
                          </h4>
                        </div>
                        <div className="sensor-ph light">
                          <h5>광명</h5>
                          <h4> {weatherSummary?.value[0].light}</h4>
                        </div>
                      </div>
                    </div>
                    <div
                      className="sensor-info col-4 col-xs-12"
                      data-sensor="WAVG"
                      style={{ position: 'relative', top: '130px' }}>
                      <div
                        style={{
                          color: 'white',
                          paddingLeft: '5px',
                          fontWeight: 'bold'
                        }}>
                        데이터 평균
                      </div>
                      <div className="sensor-info-row mb-2">
                        <div className="sensor-temperature temp">
                          <h5>온도</h5>
                          <h4>
                            {weatherSummary?.value[4].temp}
                            <span className="unit"> ºC</span>
                          </h4>
                        </div>
                        <div className="sensor-temperature humi">
                          <h5>습도</h5>
                          <h4>
                            {weatherSummary?.value[4].humi}
                            <span className="unit"> %</span>
                          </h4>
                        </div>
                        <div className="sensor-temperature wd">
                          <h5>풍향</h5>
                          <h4> {weatherSummary?.value[4].wd}</h4>
                        </div>
                        <div className="sensor-temperature ws">
                          <h5>풍속</h5>
                          <h4>
                            {weatherSummary?.value[4].ws}
                            <span className="unit"> m/s</span>
                          </h4>
                        </div>
                      </div>
                      <div className="sensor-info-row">
                        <div className="sensor-ec pm10">
                          <h5>PM10</h5>
                          <h4>
                            {weatherSummary?.value[4].pm10.value}
                            <span id="pm10avg" className="pm-good pm-state ml-1">
                              {weatherSummary?.value[4].pm10.grade}
                            </span>
                          </h4>
                        </div>
                        <div className="sensor-ph pm25">
                          <h5>PM25</h5>
                          <h4>
                            {weatherSummary?.value[4].pm25.value}
                            <span id="pm25avg" className="pm-good pm-state ml-1">
                              {weatherSummary?.value[4].pm25.grade}
                            </span>
                          </h4>
                        </div>
                        <div className="sensor-ph co2">
                          <h5>CO2</h5>
                          <h4>
                            {weatherSummary?.value[4].co2}
                            <span className="unit"> ppm</span>
                          </h4>
                        </div>
                        <div className="sensor-ph light">
                          <h5>광명</h5>
                          <h4> {weatherSummary?.value[4].light}</h4>
                        </div>
                      </div>
                    </div>

                    {/* 동남 기상센서 */}
                    <div className="sensor-info col-4 col-xs-12" data-sensor="W003">
                      <div className="sensor-info-row mb-2">
                        <div className="sensor-temperature temp">
                          <h5>온도</h5>
                          <h4>
                            {weatherSummary?.value[2].temp}
                            <span className="unit"> ºC</span>
                          </h4>
                        </div>
                        <div className="sensor-temperature humi">
                          <h5>습도</h5>
                          <h4>
                            {weatherSummary?.value[2].humi}
                            <span className="unit"> %</span>
                          </h4>
                        </div>
                        <div className="sensor-temperature wd">
                          <h5>풍향</h5>
                          <h4> {weatherSummary?.value[2].wd}</h4>
                        </div>
                        <div className="sensor-temperature ws">
                          <h5>풍속</h5>
                          <h4>
                            {weatherSummary?.value[2].ws}
                            <span className="unit"> m/s</span>
                          </h4>
                        </div>
                      </div>
                      <div className="sensor-info-row">
                        <div className="sensor-ec pm10">
                          <h5>PM10</h5>
                          <h4>
                            {weatherSummary?.value[2].pm10.value}
                            <span id="pm10W003" className="pm-good pm-state ml-1">
                              {weatherSummary?.value[2].pm10.grade}
                            </span>
                          </h4>
                        </div>
                        <div className="sensor-ph pm25">
                          <h5>PM25</h5>
                          <h4>
                            {weatherSummary?.value[2].pm25.value}
                            <span id="pm25W003" className="pm-good pm-state ml-1">
                              {weatherSummary?.value[2].pm25.grade}
                            </span>
                          </h4>
                        </div>
                        <div className="sensor-ph co2">
                          <h5>CO2</h5>
                          <h4>
                            {weatherSummary?.value[2].co2}
                            <span className="unit"> ppm</span>
                          </h4>
                        </div>
                        <div className="sensor-ph light">
                          <h5>광명</h5>
                          <h4> {weatherSummary?.value[2].light}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sensor-row"></div>
                </div>
                {/* 서북기상센서 */}
                <div className="stadium-sensor sensor-bottom">
                  <div className="sensor-row row">
                    <div className="sensor-info col-4 col-xs-12" data-sensor="W004">
                      <div className="sensor-info-row mb-2">
                        <div className="sensor-temperature temp">
                          <h5>온도</h5>
                          <h4>
                            {weatherSummary?.value[3].temp}
                            <span className="unit"> ºC</span>
                          </h4>
                        </div>
                        <div className="sensor-temperature humi">
                          <h5>습도</h5>
                          <h4>
                            {weatherSummary?.value[3].humi}
                            <span className="unit"> %</span>
                          </h4>
                        </div>
                        <div className="sensor-temperature wd">
                          <h5>풍향</h5>
                          <h4> {weatherSummary?.value[3].wd}</h4>
                        </div>
                        <div className="sensor-temperature ws">
                          <h5>풍속</h5>
                          <h4>
                            {weatherSummary?.value[3].ws}
                            <span className="unit"> m/s</span>
                          </h4>
                        </div>
                      </div>
                      <div className="sensor-info-row">
                        <div className="sensor-ec pm10">
                          <h5>PM10</h5>
                          <h4>
                            {weatherSummary?.value[3].pm10.value}
                            <span id="pm10W004" className="pm-good pm-state ml-1">
                              {weatherSummary?.value[3].pm10.grade}
                            </span>
                          </h4>
                        </div>
                        <div className="sensor-ph pm25">
                          <h5>PM25</h5>
                          <h4>
                            {weatherSummary?.value[3].pm25.value}
                            <span id="pm25W004" className="pm-good pm-state ml-1">
                              {weatherSummary?.value[3].pm25.grade}
                            </span>
                          </h4>
                        </div>
                        <div className="sensor-ph co2">
                          <h5>CO2</h5>
                          <h4>
                            {weatherSummary?.value[3].co2}
                            <span className="unit"> ppm</span>
                          </h4>
                        </div>
                        <div className="sensor-ph light">
                          <h5>광명</h5>
                          <h4> {weatherSummary?.value[3].light}</h4>
                        </div>
                      </div>
                    </div>

                    {/* 서남기상센서 */}
                    <div className="sensor-info col-4 col-xs-12" data-sensor="W002">
                      <div className="sensor-info-row mb-2">
                        <div className="sensor-temperature temp">
                          <h5>온도</h5>
                          <h4>
                            {weatherSummary?.value[1].temp}
                            <span className="unit"> ºC</span>
                          </h4>
                        </div>
                        <div className="sensor-temperature humi">
                          <h5>습도</h5>
                          <h4>
                            {weatherSummary?.value[1].humi}
                            <span className="unit"> %</span>
                          </h4>
                        </div>
                        <div className="sensor-temperature wd">
                          <h5>풍향</h5>
                          <h4> {weatherSummary?.value[1].wd}</h4>
                        </div>
                        <div className="sensor-temperature ws">
                          <h5>풍속</h5>
                          <h4>
                            {weatherSummary?.value[1].ws}
                            <span className="unit"> m/s</span>
                          </h4>
                        </div>
                      </div>
                      <div className="sensor-info-row">
                        <div className="sensor-ec pm10">
                          <h5>PM10</h5>
                          <h4>
                            {weatherSummary?.value[1].pm10.value}
                            <span id="pm10W002" className="pm-good pm-state ml-1">
                              {weatherSummary?.value[1].pm10.grade}
                            </span>
                          </h4>
                        </div>
                        <div className="sensor-ph pm25">
                          <h5>PM25</h5>
                          <h4>
                            {weatherSummary?.value[1].pm25.value}
                            <span id="pm25W002" className="pm-good pm-state ml-1">
                              {weatherSummary?.value[1].pm25.grade}
                            </span>
                          </h4>
                        </div>
                        <div className="sensor-ph co2">
                          <h5>CO2</h5>
                          <h4>
                            {weatherSummary?.value[1].co2}
                            <span className="unit"> ppm</span>
                          </h4>
                        </div>
                        <div className="sensor-ph light">
                          <h5>광명</h5>
                          <h4> {weatherSummary?.value[1].light}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sensor-row"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSummary;
