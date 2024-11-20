import React, { useState, useEffect } from 'react';
import { Form, Button, Space, Select, Input } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { calendarLocationOptions } from 'common/constants/calendar';
import { ScheduleAmPm } from 'shared/api/calendar/calendarAPIService.types';
import { useCalendarStore } from 'shared/store/calendar/calendar';
import { SelectOptionTypes } from 'common/types';

interface DynamicWorkItemsProps {
  workItems: ScheduleAmPm[];
  handleAdd: (type: 'am' | 'pm', workItems: ScheduleAmPm[]) => void;
  handleRemove: (index: number, type: 'am' | 'pm') => void;
  handleChange: (value: string, field: string, index: number, type: 'am' | 'pm') => void;
  type: 'am' | 'pm';
}

const DynamicWorkItems: React.FC<DynamicWorkItemsProps> = ({
  workItems,
  handleAdd,
  handleRemove,
  handleChange,
  type
}) => {
  const { mainTypes, subTypes } = useCalendarStore();

  const getFilteredSubTypes = (mainValue: string | undefined) => {
    const filtered = subTypes.find(sub => sub.parentValue === mainValue);
    return filtered ? filtered.children : [];
  };

  const [filteredSubTypes, setFilteredSubTypes] = useState<Record<number, SelectOptionTypes[]>>({});

  useEffect(() => {
    // 각 workItem의 `main` 값에 따라 subTypes를 초기화
    const initialSubTypes = workItems.reduce(
      (acc, workItem, index) => {
        acc[index] = getFilteredSubTypes(workItem.main);
        return acc;
      },
      {} as Record<number, SelectOptionTypes[]>
    );
    setFilteredSubTypes(initialSubTypes);
  }, [workItems, subTypes]);

  const handleMainChange = (value: string, index: number) => {
    // `main` 변경 시, 관련 `subTypes`를 필터링
    const newFilteredSubTypes = { ...filteredSubTypes, [index]: getFilteredSubTypes(value) };
    setFilteredSubTypes(newFilteredSubTypes);

    // 상위 컴포넌트에 값 전달
    handleChange(value, 'main', index, type);
  };

  return (
    <div className="work-item-container">
      {workItems.map((_, index) => (
        <Space key={index} style={{ display: 'flex', marginBottom: 10, alignItems: 'start' }} align="baseline">
          <Form.Item label={`작업장소 ${index + 1}`}>
            <Select
              options={calendarLocationOptions}
              value={workItems[index].loc}
              onChange={value => handleChange(value, 'loc', index, type)}
            />
          </Form.Item>
          <Form.Item label={`${type === 'am' ? '오전' : '오후'} 작업 ${index + 1}`}>
            <Select
              options={mainTypes}
              value={workItems[index].main}
              onChange={value => handleMainChange(value, index)}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: '30px' }}
            label={`${type === 'am' ? '오전' : '오후'} 작업 상세 ${index + 1}`}>
            {filteredSubTypes[index]?.length > 0 ? (
              <Select
                options={filteredSubTypes[index]}
                value={workItems[index].sub}
                onChange={value => handleChange(value, 'sub', index, type)}
              />
            ) : (
              <Input
                value={workItems[index].sub}
                onChange={e => handleChange(e.target.value, 'sub', index, type)}
                placeholder="상세 작업을 입력하세요"
              />
            )}
          </Form.Item>
          <Button
            disabled={index === 0}
            icon={<DeleteOutlined />}
            onClick={() => handleRemove(index, type)}
            type="text"></Button>
        </Space>
      ))}

      <Button className="add-button" type="dashed" icon={<PlusOutlined />} onClick={() => handleAdd(type, workItems)}>
        작업 추가
      </Button>
    </div>
  );
};

export default DynamicWorkItems;
