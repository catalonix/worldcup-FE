import React, { useEffect, useState } from 'react';
import { Switch, Table, Select } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { Program } from 'shared/api/operation/operationAPIService.types';
import operationAPI from 'shared/api/operation/operationAPIService';
import { timeOptions } from 'common/constants/remoteOperations';
import useOperation from 'hooks/useOperation';

type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;

interface FanTableProps {
  type: 'program' | 'unit';
}
const FanTable = (props: FanTableProps) => {
  const { getIrrigation } = useOperation();

  const [data, setData] = useState<Program[] | undefined>([] as Program[]);

  // TODO: ON / OFF
  const handleChangeStatus = async (value: boolean, item: Program) => {
    console.log('value', value);
    console.log('item', item);
    const res = await operationAPI.updateIrrigation({ key: item.programId, active: value, time: '2' });
    if (res) {
      console.log('update', res);
    }
  };

  const programColumns: ColumnsType<Program> = [
    {
      title: '프로그램명',
      key: 'name',
      render: item => (
        <div className="d-flex align-center ga-1">
          <div style={{ width: '80px', color: '#8c9fb9' }}>{item.name}</div>
          <Select value={item.time} options={timeOptions} style={{ width: '70px' }} />
        </div>
      )
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
      key: 'schedule1',
      render: item => <div className="schedule">{item.schedule[0] ? item.schedule[0] : '-'}</div>
    },
    {
      title: '이전 작업2',
      key: 'schedule2',
      render: item => <div className="schedule">{item.schedule[1] ? item.schedule[1] : '-'}</div>
    },
    {
      title: '이전 작업3',
      key: 'schedule3',
      render: item => <div className="schedule">{item.schedule[2] ? item.schedule[2] : '-'}</div>
    },
    {
      title: '종료 예정시간',
      key: 'schedule4',
      render: item => <div className="schedule">{item.schedule[3] ? item.schedule[3] : '-'}</div>
    }
  ];

  useEffect(() => {
    console.log('props', props.type);
    console.log('data', data);

    const fetchData = async () => {
      const data = await getIrrigation();
      setData(props.type === 'program' ? data?.program : data?.unit);
    };
    fetchData();
  }, [props.type]);

  return (
    <div className="fan-table-container">
      <Table columns={programColumns} dataSource={data} style={{ overflowX: 'scroll' }} pagination={false} />
    </div>
  );
};
export default FanTable;
