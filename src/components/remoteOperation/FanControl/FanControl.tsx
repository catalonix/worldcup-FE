import React from 'react';
import { Switch, Table } from 'antd';
import type { GetProp, TableProps } from 'antd';

type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;

interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
  description: string;
}

const FanControl = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: '프로그램명',
      dataIndex: 'name'
    },
    {
      title: '작동 현황',
      key: 'action',
      render: () => <Switch />
    },
    {
      title: '이전 작업1',
      dataIndex: 'address'
    },
    {
      title: '이전 작업2',
      key: 'action',
      render: () => <div>HI</div>
    },
    {
      title: '이전 작업3',
      key: 'action',
      render: () => <div>HI</div>
    },
    {
      title: '종료 예정시간',
      key: 'action',
      render: () => <div>HI</div>
    }
  ];

  return (
    <div>
      <Table columns={columns} showHeader={false} />
    </div>
  );
};
export default FanControl;
