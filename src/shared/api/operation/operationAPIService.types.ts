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

export type Program = { programId: string; schedule: string[]; name: string; active: boolean; time?: string };

export type GetIrrigationResponseType = {
  program: Program[];
  unit: Program[];
};

export type UpdateIrrigationParams = {
  key: string;
  active: boolean;
  time: string;
};

export type FanType = {
  name: string;
  key: FanList;
  lastChanged: string;
  active: boolean;
};

export type GetFanControlResponseType = FanType[];

export type DetailFan = {
  comment: string;
  fans: string;
  no: number;
  time: string;
};

export type GetDetailFanScheduleResponseType = DetailFan[];

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
