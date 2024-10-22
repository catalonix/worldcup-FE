import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, DatePicker, Select } from 'antd';
import Card from 'components/common/Card';

import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';

import { userSearchOptions } from 'common/constants/userManagement';
import AddUserModal from 'components/UserManagement/AddUserModal';
import UserTable from 'components/UserManagement/UserTable';
import useUserManagement from 'hooks/userManagement';

const UserManagment = () => {
  const { getUserList } = useUserManagement();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleClickUserAddBtn = () => {
    setIsModalVisible(true);
  };

  const handleIsModalVisible = (isModalVisible: boolean) => {
    setIsModalVisible(isModalVisible);
  };

  useEffect(() => {
    getUserList();
  }, []);

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
        <div className="search-content">
          <UserTable />
        </div>
      </Card>
      <AddUserModal handleIsModalVisible={handleIsModalVisible} isModalVisible={isModalVisible} />
    </div>
  );
};
export default UserManagment;
