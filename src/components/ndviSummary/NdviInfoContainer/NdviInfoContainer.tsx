import React from 'react';
import { Chart } from 'react-chartjs-2';

const NdviInfoContainer = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      }
    }
  };

  const data = {
    labels: ['1', '2', '3'], // x축을 나타내는 가상의 레이블
    datasets: [
      {
        label: '토양습도',
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
        borderColor: 'blue',
        data: [3, 5, 11] // y 값
      },
      {
        label: '토양온도',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        borderColor: 'red',
        data: [5, 10, 10] // y 값
      },
      {
        label: '토양양분',
        backgroundColor: 'rgba(255, 165, 0, 0.5)',
        borderColor: 'orange',
        data: [15, 23, 20] // y 값
      }
    ]
  };

  return (
    <div className="info-container">
      <div className="info-box">
        <div className="card">
          <div className="card-header">지수 변화</div>
          <div className="card-body">
            <Chart type="line" data={data} options={options} />
          </div>
        </div>
      </div>
      <div className="info-box">
        <div className="card">
          <div className="card-header">NDVI 이미지</div>
          <div className="card-body">
            <Chart type="line" data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NdviInfoContainer;
