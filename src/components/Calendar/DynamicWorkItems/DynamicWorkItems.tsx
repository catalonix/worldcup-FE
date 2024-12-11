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

  // 동적으로 subTypes 필터링
  const getFilteredSubTypes = (mainValue: string | undefined) => {
    const filtered = subTypes.find(sub => sub.parentValue === mainValue);
    return filtered ? filtered.children : [];
  };

  const [filteredSubTypes, setFilteredSubTypes] = useState<Record<number, SelectOptionTypes[]>>({});

  useEffect(() => {
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
    const newFilteredSubTypes = { ...filteredSubTypes, [index]: getFilteredSubTypes(value) };
    setFilteredSubTypes(newFilteredSubTypes);

    handleChange(value, 'main', index, type);
  };

  const firstOptionValue = (options: SelectOptionTypes[]) => (options.length > 0 ? options[0].value : undefined);

  return (
    <div className="work-item-container">
      {workItems.map((_, index) => {
        const filteredOptions = filteredSubTypes[index] || [];
        const firstSubTypeValue = firstOptionValue(filteredOptions);
        const firstMainTypeValue = firstOptionValue(mainTypes);
        const firstLocationValue = firstOptionValue(calendarLocationOptions);

        return (
          <Space key={index} style={{ display: 'flex', marginBottom: 10, alignItems: 'start' }} align="baseline">
            {/* 작업장소 */}
            <Form.Item label={`작업장소 ${index + 1}`}>
              <Select
                options={calendarLocationOptions}
                value={workItems[index].loc || firstLocationValue} // 첫 번째 항목 자동 선택
                onChange={value => handleChange(value, 'loc', index, type)}
              />
            </Form.Item>

            {/* 메인 작업 */}
            <Form.Item label={`${type === 'am' ? '오전' : '오후'} 작업 ${index + 1}`}>
              <Select
                options={mainTypes}
                value={workItems[index].main || firstMainTypeValue} // 첫 번째 항목 자동 선택
                onChange={value => handleMainChange(value, index)}
              />
            </Form.Item>

            {/* 작업 상세 */}
            <Form.Item
              style={{ marginBottom: '30px' }}
              label={`${type === 'am' ? '오전' : '오후'} 작업 상세 ${index + 1}`}>
              {/* subTypes가 없을 경우 Input 표시, 있으면 첫 번째 항목 자동 선택 */}
              {filteredOptions.length > 0 ? (
                <Select
                  options={filteredOptions}
                  value={workItems[index].sub || firstSubTypeValue}
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
        );
      })}

      <Button className="add-button" type="dashed" icon={<PlusOutlined />} onClick={() => handleAdd(type, workItems)}>
        작업 추가
      </Button>
    </div>
  );
};

export default DynamicWorkItems;
