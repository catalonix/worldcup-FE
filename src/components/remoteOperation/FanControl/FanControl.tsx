import React, { useEffect, useState } from 'react';
import { Switch, Table } from 'antd';
import type { GetProp, TableProps } from 'antd';
import useOperation from 'hooks/useOperation';
import { FanType, GetFanControlResponseType } from 'shared/api/operation/operationAPIService.types';

type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;

const FanControl = ({ isReloadFanTable }: { isReloadFanTable: boolean }) => {
  const { getFanControl, updateFanActive } = useOperation();
  const [fans, setFans] = useState<GetFanControlResponseType>();

  const handleUpdateActive = async (item: FanType, active: boolean, index: number) => {
    const res = await updateFanActive(item.key, active);
    if (res) {
      if (!fans) return;
      const updatedFans = [...fans];
      updatedFans[index] = { ...updatedFans[index], ...res };
      setFans(updatedFans);
    }
  };

  const columns: ColumnsType<FanType> = [
    {
      title: '프로그램명',
      key: 'name',
      render: item => (
        <div className="d-flex align-center ga-1">
          <div className={`condition-info-circle condition-${item.active ? 'normal' : 'weird'}`}></div>
          <div style={{ whiteSpace: 'nowrap' }}>{item.name}</div>
        </div>
      )
    },
    {
      title: '작동 현황',
      key: 'action',
      render: (value, item, index) => (
        <Switch
          checkedChildren="ON"
          unCheckedChildren="OFF"
          value={item.active}
          onChange={value => handleUpdateActive(item, value, index)}
        />
      )
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
    console.log('search');
  }, [isReloadFanTable]);

  return (
    <div className="fan-control-container">
      <Table columns={columns} showHeader={false} dataSource={fans} pagination={false} />
    </div>
  );
};
export default FanControl;
