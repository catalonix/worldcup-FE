import React, { useEffect } from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

import { Button, DatePicker, Select } from 'antd';
import Card from 'components/common/Card';

import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';

import { userSearchOptions } from 'common/constants/userManagement';
import AddUserModal from 'components/UserManagement/AddUserModal';
import UserTable from 'components/UserManagement/UserTable';
import useUserManagement from 'hooks/useUserManagement';
import { GetUserListRequestType, User, UserCode } from 'shared/api/user/userAPIService.types';

const dateFormat = 'YYYY-MM-DD';

const UserManagement = () => {
  const { getUserList, userList } = useUserManagement();

  const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate() - 7)));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date()));
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User>({} as User);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [userSearchForm, setUserSearchForm] = useState<GetUserListRequestType>({
    startDate: startDate.format(dateFormat),
    endDate: endDate.format(dateFormat),
    userCode: ''
  });

  const handleChangeUserCode = (value: UserCode) => {
    setUserSearchForm({ ...userSearchForm, userCode: value });
  };

  const handleClickUserAddBtn = () => {
    setIsModalVisible(true);
    setIsEdit(false);
    setSelectedUser({} as User);
  };

  const handleIsModalVisible = (isModalVisible: boolean) => {
    setIsModalVisible(isModalVisible);
  };

  const handleSearch = () => {
    getUserList({ ...userSearchForm, startDate: startDate.format(dateFormat), endDate: endDate.format(dateFormat) });
  };

  const handleOpenEditModal = (value: User) => {
    setIsModalVisible(true);
    setSelectedUser(value);
    setIsEdit(true);
  };

  useEffect(() => {
    getUserList(userSearchForm);
  }, []);

  return (
    <div className="user-page">
      <Card title="상세검색">
        <div>
          <div className="search-content">
            <Select
              options={userSearchOptions}
              defaultValue={''}
              style={{ width: '20%' }}
              value={userSearchForm.userCode}
              onChange={handleChangeUserCode}
            />
            <DatePicker defaultValue={startDate} onChange={value => setStartDate(value)} />
            <DatePicker defaultValue={endDate} onChange={value => setEndDate(value)} minDate={startDate} />
            <Button icon={<SearchOutlined />} onClick={handleSearch}>
              조회하기
            </Button>
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
          <UserTable data={userList} handleSearch={handleSearch} handleOpenEditModal={handleOpenEditModal} />
        </div>
      </Card>
      <AddUserModal
        handleIsModalVisible={handleIsModalVisible}
        isModalVisible={isModalVisible}
        handleSearch={handleSearch}
        initialValue={selectedUser}
        isEdit={isEdit}
      />
    </div>
  );
};
export default UserManagement;
