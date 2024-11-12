import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

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
        <Space key={index} style={{ display: 'flex', marginBottom: 8, alignItems: 'start' }} align="baseline">
          <Form.Item
            label={`작업장소 ${index + 1}`}
            name={`dept-${index}`}
            rules={[{ required: true, message: '작업장소를 입력하세요!' }]}>
            <Input
              value={workItems[index].dept}
              onChange={e => handleChange(e.target.value, 'dept', index, type)}
              placeholder={`작업장소 ${index + 1}`}
            />
          </Form.Item>
          <Form.Item
            label={`${type === 'am' ? '오전' : '오후'} 작업 ${index + 1}`}
            name={`morningWork-${index}`}
            rules={[{ required: true, message: `${type === 'am' ? '오전' : '오후'}작업을 입력하세요!` }]}>
            <Input
              value={workItems[index].morningWork}
              onChange={e => handleChange(e.target.value, 'morningWork', index, type)}
              placeholder={`${type === 'am' ? '오전' : '오후'} 작업 ${index + 1}`}
            />
          </Form.Item>
          <Form.Item
            label={`${type === 'am' ? '오전' : '오후'} 작업 상세 ${index + 1}`}
            name={`morningWork-${index}`}
            rules={[{ required: true, message: `${type === 'am' ? '오전' : '오후'}작업을 입력하세요!` }]}>
            <Input
              value={workItems[index].morningWork}
              onChange={e => handleChange(e.target.value, 'morningWork', index, type)}
              placeholder={`${type === 'am' ? '오전' : '오후'} 작업 ${index + 1}`}
            />
          </Form.Item>
          <Button icon={<DeleteOutlined />} onClick={() => handleRemove(index, type)} type="text"></Button>
        </Space>
      ))}
      <Form.Item>
        <Button type="dashed" icon={<PlusOutlined />} onClick={() => handleAdd(type)}>
          작업 추가
        </Button>
      </Form.Item>
    </div>
  );
};

export default DynamicWorkItems;
