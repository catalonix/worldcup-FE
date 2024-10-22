import React, { useEffect } from 'react';
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

interface FanTableProps {
  type: 'program' | 'individualControl';
}
const FanTable = (props: FanTableProps) => {
  const programColumns: ColumnsType<DataType> = [
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

  useEffect(() => {
    console.log('props', props.type);
  }, [props.type]);

  return (
    <div>
      <Table columns={programColumns} />
    </div>
  );
};
export default FanTable;
