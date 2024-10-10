import { Button, DatePicker, Select } from 'antd';
import Card from 'components/common/Card';
import { userSearchOptions } from 'common/constants/UserManagement';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Modal from 'components/common/Modal';

const UserManagment = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleClickUserAddBtn = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="user-page">
      <Card title="상세검색">
        <div>
          <div className="search-content">
            <Select options={userSearchOptions} defaultValue={'all'} style={{ width: '20%' }} />
            <DatePicker />
            <DatePicker />
            <Button icon={<SearchOutlined />}>조회하기</Button>
          </div>
        </div>
      </Card>
      <Card
        title="회원정보"
        titleButton={
          <Button icon={<UserAddOutlined />} onClick={handleClickUserAddBtn}>
            회원 추가
          </Button>
        }>
        <div>
          <div className="search-content"></div>
        </div>
      </Card>

      <Modal title="회원 추가" isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
    </div>
  );
};
export default UserManagment;
