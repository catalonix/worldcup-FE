import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { Chart } from 'react-chartjs-2';
import { Button, DatePicker, Select } from 'antd';
import { ndviSearchOptions } from 'common/constants/ndviDetail';
import { SearchOutlined, DownloadOutlined, BarChartOutlined } from '@ant-design/icons';
import useSensor from 'hooks/useSensor';
import Card from 'components/common/Card';

const dateFormat = 'YYYY-MM-DD';

const NdviDetail = () => {
  const { ndviInfo, getNdviInfo } = useSensor();

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
    labels: ndviInfo?.dates, // x축을 나타내는 가상의 레이블
    datasets: [
      {
        label: ndviInfo?.data[0].name,
        backgroundColor: '#25B372',
        borderColor: '#25B372',
        data: ndviInfo?.data[0].data
      },
      {
        label: ndviInfo?.data[1].name,
        backgroundColor: '#2478FF',
        borderColor: '#2478FF',
        data: ndviInfo?.data[1].data
      },
      {
        label: ndviInfo?.data[2].name,
        backgroundColor: '#5F00FF',
        borderColor: '#5F00FF',
        data: ndviInfo?.data[2].data
      },
      {
        label: ndviInfo?.data[3].name,
        backgroundColor: '#00D8FF',
        borderColor: '#00D8FF',
        data: ndviInfo?.data[3].data
      }
    ]
  };

  const handleSearch = () => {
    getNdviInfo({ startDate: startDate.format(dateFormat), endDate: endDate.format(dateFormat) });
    console.log('ndvi', ndviInfo);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="soil-detail-container">
      <Card title="상세검색">
        <div>
          <div className="search-content">
            <Select options={ndviSearchOptions} defaultValue={'camera'} style={{ width: '20%' }} />
            <DatePicker defaultValue={startDate} onChange={value => setStartDate(value)} />
            <DatePicker defaultValue={endDate} onChange={value => setEndDate(value)} minDate={startDate} />
            <Button icon={<SearchOutlined />} onClick={handleSearch}>
              조회하기
            </Button>
          </div>
        </div>
      </Card>
      <Card title="관측정보" titleButton={<Button icon={<BarChartOutlined />}>차트보기</Button>}>
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
