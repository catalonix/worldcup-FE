import React, { useState, useEffect } from 'react';
import { Table, Input } from 'antd';
import Modal from 'components/common/Modal';
import useSensor from 'hooks/useSensor';
import useNotification from 'hooks/useNotification';
import { GetGradeValueResponseType } from 'shared/api/sensor/sensorAPIService.types';

interface HumiTempValueType {
  name: string; // "매우 낮음", "낮음", "양호" 등
  range: number[]; // 범위값
  color: string; // 색상값
}

interface MeasurementDataType {
  humi: HumiTempValueType[]; // 습도 데이터
  temp: HumiTempValueType[]; // 온도 데이터
}

interface LegendModalProps {
  isModalVisible: boolean;
  handleIsModalVisible: (value: boolean) => void;
}

const LegendModal = (props: LegendModalProps) => {
  const { getGradeValue, setGradeValue } = useSensor();
  const { openNotification } = useNotification();
  const [measurementData, setMeasurementData] = useState<GetGradeValueResponseType>({
    humi: [],
    temp: []
  });

  const handleSearch = async () => {
    const res = await getGradeValue();
    setMeasurementData(res);
  };

  useEffect(() => {
    handleSearch(); // 컴포넌트가 마운트될 때 데이터 호출
  }, []);

  // 범위 변경 핸들러
  const handleRangeChange = (index: number, dataKey: keyof MeasurementDataType, value: string, rangeIndex: number) => {
    const newMeasurementData = { ...measurementData };
    newMeasurementData[dataKey][index].range[rangeIndex] = Number(value);
    setMeasurementData(newMeasurementData);
  };

  const generateColumns = () => {
    return [
      {
        title: '구분',
        dataIndex: 'name',
        key: 'name',
        align: 'center' as const
      },
      // '매우 낮음', '낮음', '적정', '높음', '매우 높음' 범위에 대한 컬럼
      ...['매우 낮음', '낮음', '적정', '높음', '매우 높음'].map((grade, gradeIndex) => {
        return {
          title: grade,
          key: grade,
          align: 'center' as const,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          render: (text: string, record: any) => {
            const dataKey = record.key; // 'humi' or 'temp'
            const data = measurementData[dataKey as keyof MeasurementDataType];
            const item = data[gradeIndex];

            return (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ background: item.color, width: '2rem', height: '1rem' }} />
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {item.range.map((rangeValue, rangeIndex) => (
                      <div key={rangeIndex} style={{ display: 'flex', alignItems: 'center' }}>
                        <Input
                          type="number"
                          value={rangeValue}
                          onChange={e =>
                            handleRangeChange(
                              gradeIndex,
                              dataKey as keyof MeasurementDataType,
                              e.target.value,
                              rangeIndex
                            )
                          }
                        />
                        <span>{item.range.length > 1 && rangeIndex === 0 && '~'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          }
        };
      })
    ];
  };

  const handleOk = async () => {
    try {
      const res = await setGradeValue(measurementData);
      if (res) {
        openNotification('success', '수정이 완료되었어요.');
        handleCancel();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    props.handleIsModalVisible(false);
  };

  useEffect(() => {
    if (props.isModalVisible) {
      handleSearch();
    }
  }, [props.isModalVisible]);

  return (
    <Modal
      title="측정 기준 설정"
      isModalVisible={props.isModalVisible}
      handleOk={handleOk}
      handleCancel={handleCancel}
      okText="저장"
      cancelText="취소"
      width={1000}>
      <div className="modal-info">토양로봇에 토양습도 및 토양온도에 관한 측정기준을 설정해 주세요.</div>
      <Table
        dataSource={[
          { key: 'humi', name: '습도', data: measurementData.humi },
          { key: 'temp', name: '온도', data: measurementData.temp }
        ]}
        columns={generateColumns()}
        pagination={false}
        rowKey="name"
      />
    </Modal>
  );
};

export default LegendModal;
