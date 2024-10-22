import React from 'react';
import { Table } from 'antd';
import type { GetProp, TableProps } from 'antd';

type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;

interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
  description: string;
}

const UserTable = () => {
  const programColumns: ColumnsType<DataType> = [
    {
      title: '구분',
      dataIndex: 'name',
      filters: [
        {
          text: '사용자',
          value: 'user'
        },
        {
          text: '관리자',
          value: 'admin'
        }
      ],
      onFilter: (value, record) => record.address.indexOf(value as string) === 0
    },
    {
      title: '아이디',
      key: 'action'
    },
    {
      title: '담당자',
      dataIndex: 'address'
    },
    {
      title: '연락처',
      key: 'action',
      render: () => <div>HI</div>
    },
    {
      title: '부서',
      key: 'action',
      render: () => <div>HI</div>
    },
    {
      title: '권한',
      key: 'action',
      render: () => <div>HI</div>
    },
    {
      title: '등록일',
      key: 'action',
      render: () => <div>HI</div>
    }
  ];

  return <Table columns={programColumns} style={{ width: '100%' }} />;
};
export default UserTable;
