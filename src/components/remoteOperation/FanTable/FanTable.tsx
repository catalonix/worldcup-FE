import React, { useEffect, useState } from 'react';
import { Switch, Table } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { GetIrrigationResponseType, Program } from 'shared/api/operation/operationAPIService.types';

type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;

interface FanTableProps {
  type: 'program' | 'unit';
  data: GetIrrigationResponseType | undefined;
}
const FanTable = (props: FanTableProps) => {
  const [data, setData] = useState<Program[] | undefined>([] as Program[]);
  // TODO: ON / OFF
  const handleChangeStatus = (value: boolean, item: Program) => {
    console.log('value', value);
    console.log('item', item);
  };

  const programColumns: ColumnsType<Program> = [
    {
      title: '프로그램명',
      dataIndex: 'name'
    },
    {
      title: '작동 현황',
      key: 'active',
      render: item => (
        <Switch
          checkedChildren="ON"
          unCheckedChildren="OFF"
          onChange={value => handleChangeStatus(value, item)}
          value={item.active}
        />
      )
    },
    {
      title: '이전 작업1',
      key: 'schedule',
      render: item => <div>{item.schedule[0] ? item.schedule[0] : '-'}</div>
    },
    {
      title: '이전 작업2',
      key: 'action',
      render: item => <div>{item.schedule[1] ? item.schedule[1] : '-'}</div>
    },
    {
      title: '이전 작업3',
      key: 'action',
      render: item => <div>{item.schedule[2] ? item.schedule[2] : '-'}</div>
    },
    {
      title: '종료 예정시간',
      key: 'action',
      render: item => <div>{item.schedule[3] ? item.schedule[3] : '-'}</div>
    }
  ];

  useEffect(() => {
    console.log('props', props.type);
    console.log('data', data);
    setData(props.type === 'program' ? props.data?.program : props.data?.unit);
  }, [props.type]);

  return (
    <div>
      <Table columns={programColumns} dataSource={data} />
    </div>
  );
};
export default FanTable;
