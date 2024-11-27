import React, { useEffect } from 'react';
import { Select } from 'antd';
import stadium from 'common/assets/img/stadium.png';
import useSensor from 'hooks/useSensor';

const SoilSummary = () => {
  const { soilDates, soilSummary, getSoilDate, getSoilSummary } = useSensor();

  const handleGetSoilSummary = (date: string) => {
    getSoilSummary(date);
  };

  useEffect(() => {
    getSoilDate();
    handleGetSoilSummary('');
  }, []);

  return (
    <div className="soil-summary-container">
      <div className="row row-sm mt-4">
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div className="card custom-card overflow-hidden">
            <div className="card-header border-bottom-0 pb-0">
              <div>
                <div className="stadium-header">
                  <label className="main-content-label my-auto pt-2 tx-16">
                    경기장 장비현황
                    <h5 className="card-data">
                      측정일시 : <span id="tmFc">2024-07-21 04:07:12</span>
                      <span id="ndviAvg">
                        {' '}
                        / 날짜검색:{' '}
                        <Select
                          options={soilDates}
                          onChange={handleGetSoilSummary}
                          value={soilDates.length ? soilDates[0].value : '-'}
                        />
                      </span>
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
                <div className="stadium-sensor sensor-top">
                  <div className="sensor-row">
                    {soilSummary.slice(0, 6).map((it, index) => (
                      <div className="sensor-info" data-loc="31" key={index}>
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
                    {soilSummary.slice(6, 12).map(it => (
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
                <div className="stadium-sensor sensor-bottom">
                  <div className="sensor-row">
                    {soilSummary.slice(12, 18).map(it => (
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
                    {soilSummary.slice(18, 24).map((it, index) => (
                      <div className="sensor-info" data-loc="31" key={index}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilSummary;
