import React, { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import Card from 'components/common/Card';
import { Button, DatePicker, Select } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import useSensor from 'hooks/useSensor';
import { soilSearchOptions } from 'common/constants/soilDetail';

const dateFormat = 'YYYY-MM-DD';

const SoilDetail = () => {
  const { soilInfo, getSoilInfo } = useSensor();
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate() - 7)));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date()));
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      }
    }
  };

  const data = {
    labels: soilInfo?.dates,
    datasets: [
      {
        label: soilInfo?.data[0] ? soilInfo?.data[0].name : '',
        backgroundColor: '#25B372',
        borderColor: '#25B372',
        data: soilInfo?.data[0] ? soilInfo?.data[0].data : []
      },
      {
        label: soilInfo?.data[1] ? soilInfo?.data[1]?.name : '',
        backgroundColor: '#2478FF',
        borderColor: '#2478FF',
        data: soilInfo?.data[1] ? soilInfo?.data[1].data : ''
      },
      {
        label: soilInfo?.data[2] ? soilInfo?.data[2]?.name : '',
        backgroundColor: '#5F00FF',
        borderColor: '#5F00FF',
        data: soilInfo?.data[2] ? soilInfo?.data[2].data : []
      }
    ]
  };

  const handleSearch = () => {
    getSoilInfo({ startDate: startDate.format(dateFormat), endDate: endDate.format(dateFormat) });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="soil-detail-container">
      <Card title="상세검색">
        <div className="search-content">
          <Select options={soilSearchOptions} defaultValue={'soilRobot'} style={{ width: '20%' }} />
          <DatePicker defaultValue={startDate} onChange={value => setStartDate(value)} />
          <DatePicker defaultValue={endDate} onChange={value => setEndDate(value)} minDate={startDate} />
          <Button icon={<SearchOutlined />} onClick={handleSearch}>
            조회하기
          </Button>
        </div>
      </Card>
      <Card title="관측정보">
        <div className="search-content d-column">
          <div className="chart-header">
            <div>
              <div className="chart-title">토양로봇</div>
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

export default SoilDetail;
