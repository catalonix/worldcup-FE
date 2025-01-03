import React, { useState, useEffect } from 'react';

import Card from 'components/common/Card';
import { Chart } from 'react-chartjs-2';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { Button, Checkbox, DatePicker, Select } from 'antd';
import type { GetProp } from 'antd';
import { SearchOutlined, DownloadOutlined, BarChartOutlined } from '@ant-design/icons';
import { chartColor, directionOptions, valuesOptions, weatherSearchOptions } from 'common/constants/weatherDetail';
import useSensor from 'hooks/useSensor';
import useNotification from 'hooks/useNotification';

const dateFormat = 'YYYY-MM-DD';

const WeatherDetail = () => {
  const { openNotification } = useNotification();
  const { weatherInfo, getWeatherInfo, downloadWeatherCsv } = useSensor();

  const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate() - 7)));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date()));
  const [directions, setDirections] = useState<string[]>(['EN', 'WS', 'SE', 'WN']);
  const [values, setValues] = useState<string[]>(['temp']);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      }
    }
  };

  const data = {
    labels: weatherInfo?.dates || [],
    datasets:
      weatherInfo?.data?.map((item, idx) => {
        if (!item) return { data: [] };
        return {
          label: item.name || '',
          backgroundColor: chartColor[idx],
          borderColor: chartColor[idx],
          data: item.data || []
        };
      }) || []
  };

  const handleChangeDirection: GetProp<typeof Checkbox.Group, 'onChange'> = checkedValues => {
    setDirections(checkedValues as string[]);
  };

  const handleChangeValues: GetProp<typeof Checkbox.Group, 'onChange'> = checkedValues => {
    setValues(checkedValues as string[]);
  };

  const handleSearch = () => {
    if (!directions.length || !values.length) {
      openNotification('warning', '요소가 선택되지 않았습니다.');
      return;
    }
    getWeatherInfo({
      startDate: startDate.format(dateFormat),
      endDate: endDate.format(dateFormat),
      directionType: directions.toString(),
      values: values.toString()
    });
  };

  const handleClickDownload = async () => {
    await downloadWeatherCsv(startDate.format(dateFormat), endDate.format(dateFormat));
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="weather-detail-container">
      <Card title="상세검색">
        <div>
          <div className="search-content">
            <Select options={weatherSearchOptions} defaultValue={'weatherStation'} style={{ width: '20%' }} />
            <DatePicker defaultValue={startDate} onChange={value => setStartDate(value)} />
            <DatePicker defaultValue={endDate} onChange={value => setEndDate(value)} minDate={startDate} />
            <Button icon={<SearchOutlined />} onClick={handleSearch}>
              조회하기
            </Button>
          </div>
        </div>
        <div>
          <Checkbox.Group
            options={directionOptions}
            defaultValue={['EN', 'WS', 'SE', 'WN']}
            onChange={handleChangeDirection}
            className="checkbox-group"
          />
          <Checkbox.Group
            options={valuesOptions}
            defaultValue={['temp']}
            onChange={handleChangeValues}
            className="checkbox-group"
          />
        </div>
      </Card>
      <Card title="관측정보" titleButton={<Button icon={<BarChartOutlined />}>차트보기</Button>}>
        <div className="search-content d-column">
          <div className="chart-header">
            <div>
              <div className="chart-title">기상센서</div>
              <div className="chart-description">선택하신 장비에 대한 관측 데이터 그래프 입니다.</div>
            </div>
            <div onClick={handleClickDownload}>
              <Button icon={<DownloadOutlined />} />
            </div>
          </div>
          <Chart type="line" data={data} options={options} />
        </div>
      </Card>
    </div>
  );
};

export default WeatherDetail;
