import React, { useEffect, useState } from 'react';
import { Switch, Table } from 'antd';
import type { GetProp, TableProps } from 'antd';
import useOperation from 'hooks/useOperation';
import { FanType, GetFanControlResponseType } from 'shared/api/operation/operationAPIService.types';

type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;

const FanControl = ({ isReloadFanTable }: { isReloadFanTable: boolean }) => {
  const { getFanControl } = useOperation();
  const [fans, setFans] = useState<GetFanControlResponseType>();
  const columns: ColumnsType<FanType> = [
    {
      title: '프로그램명',
      key: 'name',
      render: item => (
        <div className="d-flex align-center ga-1">
          <div className={`condition-info-circle condition-${item.active ? 'normal' : 'weird'}`}></div>
          <div>{item.name}</div>
        </div>
      )
    },
    {
      title: '작동 현황',
      key: 'action',
      render: item => <Switch checkedChildren="ON" unCheckedChildren="OFF" value={item.active} />
    },
    {
      title: '',
      key: 'lastChanged',
      render: item => <div className="progress-step">{item.lastChanged.slice(0, 19).replace('T', ' ')}</div>
    },
    {
      title: '이전 작업2',
      key: 'state',
      render: item => (
        <div className={`condition-text-box situation-${item.active ? 'success' : 'danger'}`}>
          <span>{item.active ? '정상' : 'OFFLINE'}</span>
        </div>
      )
    }
  ];

  const search = async () => {
    const res = await getFanControl();
    setFans(res);
  };

  useEffect(() => {
    search();
  }, [isReloadFanTable]);
  return (
    <div className="fan-control-container">
      <Table columns={columns} showHeader={false} dataSource={fans} pagination={false} />
    </div>
  );
};
export default FanControl;
