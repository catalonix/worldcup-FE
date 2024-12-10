import React, { useEffect, useState } from 'react';
import { Button, DatePicker } from 'antd';
import { PauseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Chart } from 'react-chartjs-2';
import useSensor from 'hooks/useSensor';
import { dateFormat } from 'common/types';
import { DirectionType, NdviImageType } from 'shared/api/sensor/sensorAPIService.types';
import ReactCompareImage from 'react-compare-image';
import { directions } from 'common/constants/ndviSummary';

const NdviInfoContainer = () => {
  const { getNdviImage } = useSensor();
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
  const [currentIndex, setCurrentIndex] = React.useState(0); // 현재 슬라이더 인덱스

  const imageMap: Record<string, { now: string; predict: string }[]> = {
    east: eastImage,
    south: southImage,
    west: westImage
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

  const handleClickDirection = (direction: DirectionType) => {
    setSelectedDirection(direction);
  };
  const search = async () => {
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
  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.activeIndex); // Swiper에서 현재 슬라이드 인덱스 업데이트
    console.log('current', currentIndex);
  };

  useEffect(() => {
    search();
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

              <Button id="searchNDVI" className="tab-link" onClick={search}>
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
            {/* <Swiper
              onSlideChange={handleSlideChange}
              spaceBetween={50}
              slidesPerView={1}
              style={{ width: '100%' }}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false
              }}>
              {imageMap[selectedDirection]?.map((image, index) => (
                <SwiperSlide key={index}>
                  <ReactCompareImage leftImage={image.now} rightImage={image.predict} sliderPositionPercentage={0.5} />
                </SwiperSlide>
              ))}
            </Swiper> */}

            <ReactCompareImage
              leftImage={
                selectedDirection === 'east'
                  ? eastImage[0]?.now || ''
                  : selectedDirection === 'south'
                    ? southImage[0]?.now || ''
                    : westImage[0]?.now || ''
              }
              rightImage={
                selectedDirection === 'east'
                  ? eastImage[0]?.predict || ''
                  : selectedDirection === 'south'
                    ? southImage[0]?.predict || ''
                    : westImage[0]?.predict || ''
              }
              sliderPositionPercentage={0.5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NdviInfoContainer;
