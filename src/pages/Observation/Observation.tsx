import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { Chart } from 'react-chartjs-2';
import Card from 'components/common/Card';
import { Button, DatePicker, Checkbox, Select } from 'antd';
import type { GetProp } from 'antd';
import { SearchOutlined, DownloadOutlined, BarChartOutlined } from '@ant-design/icons';
import useSensor from 'hooks/useSensor';
import { dateFormat } from 'common/types';
import { directionOptions, valuesOptions } from 'common/constants/weatherDetail';
import { GetObservationType } from 'shared/api/sensor/sensorAPIService.types';
import { observationOptions } from 'common/constants/observation';
import useNotification from 'hooks/useNotification';
import { chartDataOptions } from 'common/constants/userManagement';

const Observation = () => {
  const { openNotification } = useNotification();
  const { observation, getObservation, downloadWeatherCsv } = useSensor();

  const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate() - 7)));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date()));
  const [directions, setDirections] = useState<string[]>(['EN', 'WS', 'SE', 'WN']);
  const [values, setValues] = useState<string[]>(['temp']);
  const [type, setType] = useState<GetObservationType>('camera');

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      }
    }
  };

  const data = {
    labels: observation?.dates,
    datasets: observation?.data
      ? observation.data.map((it, index) => {
          return {
            label: it.name ? it.name : '',
            backgroundColor: chartDataOptions[index],
            borderColor: chartDataOptions[index],
            data: it.data ? it.data : [] // y 값
          };
        })
      : []
  };

  const handleChangeDirection: GetProp<typeof Checkbox.Group, 'onChange'> = checkedValues => {
    setDirections(checkedValues as string[]);
  };

  const handleChangeValues: GetProp<typeof Checkbox.Group, 'onChange'> = checkedValues => {
    setValues(checkedValues as string[]);
  };

  const handleSearch = () => {
    if (type === 'weatherSensor') {
      if (!directions.length || !values.length) {
        openNotification('warning', '요소가 선택되지 않았습니다.');
        return;
      }
    }
    getObservation({
      startDate: startDate.format(dateFormat),
      endDate: endDate.format(dateFormat),
      type,
      directionType: directions.toString(),
      values: values.toString()
    });
  };

  const handleClickDownload = async () => {
    if (type === 'weatherSensor') {
      await downloadWeatherCsv(startDate.format(dateFormat), endDate.format(dateFormat));
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="observation-container">
      <Card title="상세검색">
        <div>
          <div className="search-content">
            <Select
              options={observationOptions}
              defaultValue={'camera'}
              style={{ width: '20%' }}
              value={type}
              onChange={value => setType(value as GetObservationType)}
            />
            <DatePicker defaultValue={startDate} onChange={value => setStartDate(value)} />
            <DatePicker defaultValue={endDate} onChange={value => setEndDate(value)} minDate={startDate} />
            <Button icon={<SearchOutlined />} onClick={handleSearch}>
              조회하기
            </Button>
          </div>
        </div>
        {type === 'weatherSensor' && (
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
        )}
      </Card>
      <Card title="관측정보" titleButton={<Button icon={<BarChartOutlined />}>차트보기</Button>}>
        <div className="search-content d-column">
          <div className="chart-header">
            <div>
              <div className="chart-title">카메라</div>
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
export default Observation;
