import React from 'react';
import { Form, Input, Button, Space, Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { calendarLocationOptions } from 'common/constants/calendar';
import { ScheduleAmPm } from 'shared/api/calendar/calendarAPIService.types';

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
  return (
    <div className="work-item-container">
      {workItems.map((_, index) => (
        <Space key={index} style={{ display: 'flex', marginBottom: 10, alignItems: 'start' }} align="baseline">
          <Form.Item label={`작업장소 ${index + 1}`} rules={[{ required: true, message: '작업장소를 입력하세요!' }]}>
            <Select
              options={calendarLocationOptions}
              value={workItems[index].loc}
              onChange={value => handleChange(value, 'loc', index, type)}
            />
          </Form.Item>
          <Form.Item
            label={`${type === 'am' ? '오전' : '오후'} 작업 ${index + 1}`}
            rules={[{ required: true, message: `${type === 'am' ? '오전' : '오후'}작업을 입력하세요!` }]}>
            <Input
              value={workItems[index].main}
              onChange={e => handleChange(e.target.value, 'main', index, type)}
              placeholder={`${type === 'am' ? '오전' : '오후'} 작업 ${index + 1}`}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: '30px' }}
            label={`${type === 'am' ? '오전' : '오후'} 작업 상세 ${index + 1}`}
            rules={[{ required: true, message: `${type === 'am' ? '오전' : '오후'}작업을 입력하세요!` }]}>
            <Input
              value={workItems[index].sub}
              onChange={e => handleChange(e.target.value, 'sub', index, type)}
              placeholder={`${type === 'am' ? '오전' : '오후'} 작업 ${index + 1}`}
            />
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
