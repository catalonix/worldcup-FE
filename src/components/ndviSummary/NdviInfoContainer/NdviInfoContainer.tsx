import React, { useEffect, useState } from 'react';
import { Button, DatePicker } from 'antd';
import { PauseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { Chart } from 'react-chartjs-2';
import useSensor from 'hooks/useSensor';
import { dateFormat } from 'common/types';
import { DirectionType, GetNdviChartResponseType, NdviImageType } from 'shared/api/sensor/sensorAPIService.types';
import ReactCompareImage from 'react-compare-image';
import { directions } from 'common/constants/ndviSummary';
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const NdviInfoContainer = () => {
  const { getNdviImage, getNdviChart } = useSensor();

  const [chart, setChart] = useState<GetNdviChartResponseType>();
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate())));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate())));

  const [westImage, setWestImage] = useState<NdviImageType[]>([]);
  const [eastImage, setEastImage] = useState<NdviImageType[]>([]);
  const [southImage, setSouthImage] = useState<NdviImageType[]>([]);

  const [selectedDirection, setSelectedDirection] = useState<DirectionType>('south');
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      }
    }
  };
  // const [currentIndex, setCurrentIndex] = React.useState(0); // 현재 슬라이더 인덱스

  const imageMap: Record<string, { now: string; predict: string }[]> = {
    east: eastImage,
    south: southImage,
    west: westImage
  };

  const data = {
    labels: chart?.dates || [],
    datasets: [
      {
        label: '토양습도',
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
        borderColor: 'blue',
        data: chart?.c001 || []
      },
      {
        label: '토양온도',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        borderColor: 'red',
        data: chart?.c002 || []
      },
      {
        label: '토양양분',
        backgroundColor: 'rgba(255, 165, 0, 0.5)',
        borderColor: 'orange',
        data: chart?.c003 || []
      }
    ]
  };

  const handleClickDirection = (direction: DirectionType) => {
    setSelectedDirection(direction);
  };

  const fetchNdviChart = async () => {
    const res = await getNdviChart();
    setChart(res);
  };

  const fetchNdviImage = async () => {
    const res = await getNdviImage(startDate.format(dateFormat), endDate.format(dateFormat));
    console.log('res', res);

    if (res && res.east) {
      setEastImage(res.east);

      if (res.west) {
        setWestImage(res.west);
      }

      if (res.south) {
        setSouthImage(res.south);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handleSlideChange = (swiper: any) => {
  //   setCurrentIndex(swiper.activeIndex); // Swiper에서 현재 슬라이드 인덱스 업데이트
  //   console.log('current', currentIndex);
  // };

  useEffect(() => {
    fetchNdviImage();
    fetchNdviChart();
  }, []);

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
          <div className="card-header ndvi-header">
            <div>NDVI 이미지</div>
            <div className="slider-button">
              <DatePicker
                onChange={value => setStartDate(value)}
                value={startDate}
                className="w-100"
                placeholder="시작일"
              />
              <DatePicker
                onChange={value => setEndDate(value)}
                value={endDate}
                className="w-100"
                placeholder="종료일"
                minDate={startDate}
              />

              <Button id="searchNDVI" className="tab-link" onClick={fetchNdviImage}>
                검색
              </Button>
              <Button>
                <PauseOutlined />
              </Button>
              <li className="btn btn-bg4 nav-item mr-2" id="playBtn2">
                <i className="ti-control-pause"></i>
              </li>
              {directions.map(direction => (
                <Button
                  key={direction}
                  type={selectedDirection === direction ? 'primary' : 'default'}
                  onClick={() => handleClickDirection(direction as DirectionType)}>
                  {direction === 'east' ? '동' : direction === 'south' ? '남' : '서'}
                </Button>
              ))}
            </div>
          </div>
          <div className="card-body ndvi-swiper">
            {imageMap[selectedDirection]?.length ? (
              <Slider {...settings}>
                {imageMap[selectedDirection].map((image, index) => (
                  <div key={index}>
                    <ReactCompareImage
                      leftImage={image.now}
                      rightImage={image.predict}
                      sliderPositionPercentage={0.5}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="no-image-message" style={{ textAlign: 'center', padding: '20px' }}>
                이미지가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NdviInfoContainer;
