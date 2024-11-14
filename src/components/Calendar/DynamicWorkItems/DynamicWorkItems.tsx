import React from 'react';
import { Form, Input, Button, Space, Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { calendarLocationOptions } from 'common/constants/calendar';

interface DynamicWorkItemsProps {
  workItems: { dept: string; morningWork: string }[];
  handleAdd: (type: 'am' | 'pm') => void;
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
          <Form.Item label={`작업장소 ${index + 1}`} name="loc">
            <Select options={calendarLocationOptions} value={workItems[index].dept} />
          </Form.Item>
          <Form.Item label={`${type === 'am' ? '오전' : '오후'} 작업 ${index + 1}`} name="main">
            <Input
              value={workItems[index].morningWork}
              onChange={e => handleChange(e.target.value, 'morningWork', index, type)}
              placeholder={`${type === 'am' ? '오전' : '오후'} 작업 ${index + 1}`}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: '30px' }}
            label={`${type === 'am' ? '오전' : '오후'} 작업 상세 ${index + 1}`}
            name="sub">
            <Input
              value={workItems[index].morningWork}
              onChange={e => handleChange(e.target.value, 'morningWork', index, type)}
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

      <Button className="add-button" type="dashed" icon={<PlusOutlined />} onClick={() => handleAdd(type)}>
        작업 추가
      </Button>
    </div>
  );
};

export default DynamicWorkItems;
