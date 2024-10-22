import React from 'react';
import { Table } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { User } from 'shared/api/user/userAPIService.types';

type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;

interface UserTableProps {
  data: User[];
}

const UserTable = (props: UserTableProps) => {
  const programColumns: ColumnsType<User> = [
    // {
    //   title: '구분',
    //   key: 'index',
    //   render: (it, index) => <span>{index}</span>
    // },
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
    }
  ];

  return <Table columns={programColumns} style={{ width: '100%' }} dataSource={props.data} key="userTable" />;
};
export default UserTable;
