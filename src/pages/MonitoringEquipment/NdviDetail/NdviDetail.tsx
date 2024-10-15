import React from 'react';
import Card from 'components/common/Card';
import { Chart } from 'react-chartjs-2';
import { Button, DatePicker, Select } from 'antd';
import { ndviSearchOptions } from 'common/constants/ndviDetail';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';

const NdviDetail = () => {
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
    <div className="soil-detail-container">
      <Card title="상세검색">
        <div>
          <div className="search-content">
            <Select options={ndviSearchOptions} defaultValue={'camera'} style={{ width: '20%' }} />
            <DatePicker />
            <DatePicker />
            <Button icon={<SearchOutlined />}>조회하기</Button>
          </div>
        </div>
      </Card>
      <Card title="관측정보" titleButton={<Button>차트보기</Button>}>
        <div className="search-content d-column">
          <div className="chart-header">
            <div>
              <div className="chart-title">카메라</div>
              <div className="chart-description">선택하신 장비에 대한 관측 데이터 그래프 입니다.</div>
            </div>
            <div>
              <Button icon={<DownloadOutlined />} />
            </div>
          </div>
          <Chart type="line" data={data} options={options} />
        </div>
      </Card>
    </div>
  );
};

export default NdviDetail;
