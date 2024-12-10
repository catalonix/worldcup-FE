import React, { useEffect, useRef, useState } from 'react';
import { Button, DatePicker, Modal } from 'antd';
import { PauseOutlined, CameraOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { directions } from 'common/constants/ndviSummary';
import { dateFormat } from 'common/types';
import { DirectionType } from 'shared/api/sensor/sensorAPIService.types';
import useSensor from 'hooks/useSensor';
import useNotification from 'hooks/useNotification';
import Slider from 'react-slick';

const CustomPrevArrow = (props: { onClick?: () => void }) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="right"
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        cursor: 'pointer'
      }}>
      <CaretLeftOutlined />
    </div>
  );
};

const CustomNextArrow = (props: { onClick?: () => void }) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="left"
      style={{
        position: 'absolute',
        top: '50%',
        right: '0px',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        cursor: 'pointer'
      }}>
      <CaretRightOutlined />
    </div>
  );
};

const NdviLiveCameraContainer = () => {
  const { getFieldImage, captureCamera, getLiveUrl } = useSensor();
  const { openNotification } = useNotification();

  const sliderRef = useRef<Slider | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [capturedDate, setCapturedDate] = useState<string>('');
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate())));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate())));

  const [westImage, setWestImage] = useState<string[]>([]);
  const [eastImage, setEastImage] = useState<string[]>([]);
  const [southImage, setSouthImage] = useState<string[]>([]);
  const [selectedDirection, setSelectedDirection] = useState<DirectionType>('south');

  const imageMap: Record<string, string[]> = {
    east: eastImage,
    south: southImage,
    west: westImage
  };

  const settings = {
    dots: false,
    arrow: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    infinite: false,
    autoPlay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
    adaptiveHeight: true
  };

  const handleClickDirection = (direction: DirectionType) => {
    setSelectedDirection(direction);
  };

  const fetchFieldImage = async () => {
    setIsLoading(true);
    const res = await getFieldImage(startDate.format(dateFormat), endDate.format(dateFormat));
    console.log('res', res);
    setCapturedDate(res.captureDate.replace('T', ' ').slice(0, 19));

    if (res && res.east) {
      setEastImage(res.east);

      if (res.west) {
        setWestImage(res.west);
      }

      if (res.south) {
        setSouthImage(res.south);
      }

      console.log('south', southImage);
    }
  };

  const handleClickLive = async () => {
    const url = await getLiveUrl(selectedDirection);
    if (url) {
      window.open(url.url, '_blank');
    }
  };

  const handleClickCapture = () => {
    Modal.confirm({
      title: '실시간 이미지를 촬영 하시겠습니까?',
      onOk: async () => {
        const res = await captureCamera();
        if (res) openNotification('success', '실시간 이미지가 촬영되었어요.');
      }
    });
  };

  useEffect(() => {
    fetchFieldImage();
  }, []);

  useEffect(() => {
    if (sliderRef.current && imageMap[selectedDirection]?.length > 0) {
      sliderRef.current.slickGoTo(0); // 슬라이더 초기화
    }

    if (imageMap[selectedDirection]?.length) {
      setIsLoading(false);
    }

    console.log('imageMap[selectedDirection]', imageMap[selectedDirection]);
  }, [imageMap, selectedDirection]);

  return (
    <div className="camera-container">
      <div className="card">
        <div className="card-header">
          <div>경기장 이미지(촬영일시: {capturedDate})</div>

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

            <Button id="searchNDVI" className="tab-link" onClick={fetchFieldImage}>
              검색
            </Button>
            <Button>
              <PauseOutlined />
            </Button>

            <Button type="primary" onClick={handleClickLive}>
              LIVE
            </Button>
            <Button type="primary" onClick={handleClickCapture}>
              <CameraOutlined />
              촬영
            </Button>
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
        <div className="card-body">
          <div className="slider-container">
            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>이미지를 불러오는 중입니다...</div>
            ) : imageMap[selectedDirection]?.length > 1 ? (
              <Slider ref={sliderRef} {...settings} key={imageMap[selectedDirection]?.length}>
                {imageMap[selectedDirection].map(img => (
                  <div key={img}>
                    <img src={img} alt="실시간 사진" width="100%" />
                  </div>
                ))}
              </Slider>
            ) : imageMap[selectedDirection]?.length === 1 ? (
              <div>
                <img src={imageMap[selectedDirection][0]} alt="실시간 사진" width="100%" />
              </div>
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
export default NdviLiveCameraContainer;
