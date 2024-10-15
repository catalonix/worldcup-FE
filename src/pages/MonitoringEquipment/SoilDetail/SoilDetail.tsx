import React from 'react';
import { Chart } from 'react-chartjs-2';
import Card from 'components/common/Card';
import { Button, DatePicker, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { soilSearchOptions } from 'common/constants/soilDetail';

const SoilDetail = () => {
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
    <div>
      <Card title="상세검색">
        <div className="search-content">
          <Select options={soilSearchOptions} defaultValue={'soilRobot'} style={{ width: '20%' }} />
          <DatePicker />
          <DatePicker />
          <Button icon={<SearchOutlined />}>조회하기</Button>
        </div>
      </Card>
      <Card title="관측정보">
        <div className="search-content">
          <Chart type="line" data={data} options={options} />
        </div>
      </Card>
    </div>
  );
};

export default SoilDetail;
