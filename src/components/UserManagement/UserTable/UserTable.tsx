import React from 'react';
import { Table, Dropdown, Button, Modal } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { User } from 'shared/api/user/userAPIService.types';
import useUserManagement from 'hooks/userManagement';

type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;

interface UserTableProps {
  data: User[];
}

const UserTable = (props: UserTableProps) => {
  const { deleteUser } = useUserManagement();
  const handleDelete = (user: User) => {
    Modal.confirm({
      title: '정말로 삭제하시겠어요?',
      content: '삭제 후 복구할 수 없어요.',
      onOk: () => {
        deleteUser(user.userId);
      }
    });
  };

  const programColumns: ColumnsType<User> = [
    {
      title: '아이디',
      key: 'userId',
      dataIndex: 'userId'
    },
    {
      title: '담당자',
      key: 'userName',
      dataIndex: 'userName'
    },
    {
      title: '연락처',
      key: 'hp',
      dataIndex: 'hp'
    },
    {
      title: '부서',
      key: 'dept',
      dataIndex: 'dept'
    },
    {
      title: '권한',
      key: 'userCode',
      dataIndex: 'userCode',
      filters: [
        {
          text: '사용자',
          value: '0'
        },
        {
          text: '관리자',
          value: '1'
        }
      ],
      render: (it: string) => (it === '0' ? '사용자' : '관리자'),
      onFilter: (value, record) => {
        return record.userCode.indexOf(value as string) === 0;
      }
    },
    {
      title: '등록일',
      key: 'regDate',
      dataIndex: 'regDate'
    },
    {
      title: '관리',
      key: 'action',
      render: text => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'edit',
                label: <span>수정</span>
              },
              {
                key: 'delete',
                label: <span onClick={() => handleDelete(text)}>삭제</span>
              }
            ]
          }}
          trigger={['click']}>
          <Button type="text" icon={<MenuOutlined />} />
        </Dropdown>
      )
    }
  ];

  return <Table columns={programColumns} style={{ width: '100%' }} dataSource={props.data} key="userTable" />;
};
export default UserTable;
