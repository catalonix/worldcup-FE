export type RemoteStatus = {
  name: string;
  state: 'on' | 'off';
  key: FanList;
  lastChanged: string;
};
export type GetRemoteStatusResponseType = RemoteStatus[];

export type GetOperationDetailResponseType = {
  lastChanged: string;
  schedule: string;
  state: 'on' | 'off';
  key: FanList;
  name: string;
  operationTime: number;
};

export type FanList =
  | 'binary_sensor.fan02'
  | 'binary_sensor.fan03'
  | 'binary_sensor.fan04'
  | 'binary_sensor.fan05'
  | 'binary_sensor.fan06'
  | 'binary_sensor.fan07'
  | 'binary_sensor.fan08'
  | 'binary_sensor.fan10'
  | 'person.robot'
  | 'irrigation';
