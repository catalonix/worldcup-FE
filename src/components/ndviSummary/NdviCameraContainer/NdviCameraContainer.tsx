import React, { useEffect, useState } from 'react';
import useSensor from 'hooks/useSensor';
import { GetNdviCameraResponseType } from 'shared/api/sensor/sensorAPIService.types';
import ReactCompareImage from 'react-compare-image';

const NdviCameraContainer = () => {
  const { getNdviCamera } = useSensor();
  const [cameras, setCameras] = useState<GetNdviCameraResponseType>();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().slice(0, 10); // 'YYYY-MM-DD' 형식
    const formattedTime = date.toTimeString().slice(0, 5); // 'HH:MM' 형식
    return { formattedDate, formattedTime };
  };

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const res = await getNdviCamera();
        setCameras(res);
      } catch (error) {
        console.error('Error fetching cameras data:', error);
      }
    };

    fetchCameras();
  }, []);

  if (!cameras) {
    return <div>Loading...</div>;
  }

  const renderCamera = (key: keyof GetNdviCameraResponseType, label: string) => {
    const data = cameras[key];

    return (
      <div className="ndvi-camera" key={key}>
        <div className="card-header">{label}</div>
        <div className="ndvi-camera__body">
          <div className="ndvi-value">
            <div className="ndvi-now">
              <h5>현재 식생지수</h5>
              <div className="now-value">
                <h4>{data.ndviDaily.toFixed(3)}</h4>
                <span className={data.ndviDaily > 0.5 ? 'situation-success' : 'situation-danger'}>
                  {data.ndviDaily > 0.5 ? '양호' : '미흡'}
                </span>
              </div>
            </div>
            <div className="ndvi-now">
              <h5 style={{ textAlign: 'center' }}>최종 데이터 측정일시</h5>
              <div className="now-value">
                <h4>
                  {formatDate(data.date).formattedDate} <br className="mobileBr" />
                  {formatDate(data.date).formattedTime}
                </h4>
              </div>
            </div>
            <div className="ndvi-prediction">
              <h5>예측 식생지수</h5>
              <div className="prediction-value">
                <h4>{data.ndviMa5.toFixed(3)}</h4>
                <span className={data.ndviMa5 > 0.5 ? 'situation-success' : 'situation-danger'}>
                  {data.ndviMa5 > 0.5 ? '양호' : '미흡'}
                </span>
              </div>
            </div>
          </div>
          <div>
            <ReactCompareImage leftImage={data.dailyUrl} rightImage={data.ma5Url} sliderPositionPercentage={0.5} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="ndvi-container">
      {renderCamera('east', '동측 카메라')}
      {renderCamera('south', '남측 카메라')}
      {renderCamera('west', '서측 카메라')}
    </div>
  );
};
export default NdviCameraContainer;
