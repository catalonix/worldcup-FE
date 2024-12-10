import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Modal } from 'antd';
import { PauseOutlined, CameraOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { directions } from 'common/constants/ndviSummary';
import { dateFormat } from 'common/types';
import { DirectionType } from 'shared/api/sensor/sensorAPIService.types';
import useSensor from 'hooks/useSensor';
import useNotification from 'hooks/useNotification';
import { Swiper, SwiperSlide } from 'swiper/react';

const NdviLiveCameraContainer = () => {
  const { getFieldImage, captureCamera, getLiveUrl } = useSensor();
  const { openNotification } = useNotification();

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

  const handleClickDirection = (direction: DirectionType) => {
    setSelectedDirection(direction);
  };

  const fetchFieldImage = async () => {
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
    console.log('imageMap[selectedDirection]', imageMap[selectedDirection]);
  }, [selectedDirection]);

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
          {imageMap[selectedDirection]?.length ? (
            <Swiper spaceBetween={50} speed={1000}>
              {imageMap[selectedDirection].map(img => (
                <SwiperSlide key={img}>
                  <img src={img} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="no-image-message" style={{ textAlign: 'center', padding: '20px' }}>
              이미지가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NdviLiveCameraContainer;
