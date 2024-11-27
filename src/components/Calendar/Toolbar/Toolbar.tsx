import React from 'react';
import { Button, Checkbox, GetProp } from 'antd';

import { DownloadOutlined, LeftOutlined, RightOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { calendarSearchOptions } from 'common/constants/calendar';

type CustomToolbarProps = {
  date: Date;
  onNavigate: (action: 'TODAY' | 'PREV' | 'NEXT') => void;
  handleIsModalVisible: (isVisible: boolean) => void;
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomToolbar = ({
  date,
  onNavigate,
  handleIsModalVisible,
  selectedTypes,
  setSelectedTypes,
  setIsEdit
}: CustomToolbarProps) => {
  const navigate = (action: 'TODAY' | 'PREV' | 'NEXT') => {
    onNavigate(action);
  };

  const handleChangeDirection: GetProp<typeof Checkbox.Group, 'onChange'> = checkedValues => {
    setSelectedTypes(checkedValues as string[]);
  };

  const handleDownloadCalendar = () => {
    alert('download');
  };

  const handleAddBtnClick = () => {
    setIsEdit(false);
    handleIsModalVisible(true);
  };
  return (
    <div className="rbc-toolbar">
      <div className="d-flex align-center justify-space-between w-100">
        <span className="rbc-btn-group">
          <Button icon={<LeftOutlined />} onClick={() => navigate('PREV')}></Button>
          <Button icon={<RightOutlined />} onClick={() => navigate('NEXT')}></Button>
          <Button onClick={() => navigate('TODAY')}>오늘</Button>
        </span>
        <span className="rbc-toolbar-label">{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</span>
        <span className="rbc-btn-group">
          <Button onClick={handleAddBtnClick}>
            <PlusSquareOutlined className="mr-1" /> 추가
          </Button>
          <Button
            icon={<DownloadOutlined />}
            onClick={handleDownloadCalendar}
            style={{ background: '#374b64' }}></Button>
        </span>
      </div>

      <div style={{ marginTop: '0.5rem' }}>
        <Checkbox.Group
          options={calendarSearchOptions}
          defaultValue={selectedTypes}
          onChange={handleChangeDirection}
          className="checkbox-group"
        />
      </div>
    </div>
  );
};

export default CustomToolbar;
