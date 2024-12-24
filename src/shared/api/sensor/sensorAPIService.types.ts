export interface GetNdviInfoParams {
  startDate?: string;
  endDate?: string;
}

export type GetSensorInfoResponseType = {
  dates: string[];
  data: { key: string; name: string; data: number[] }[];
};

export type GetSoilSummaryResponseType = {
  tm: string; // 일시
  lat: number;
  lon: number;
  loc_no: string;
  smo: { value: number; backgroundColor: string }; // 토양 습도
  stp: { value: number; backgroundColor: string }; // 토양 온도
  sec: number; // EC
}[];

export interface GetWeatherInfoParams extends GetNdviInfoParams {
  directionType?: string;
  values?: string;
}

export type GetWeatherSummaryResponseType = {
  date: string;
  value: {
    name: string;
    temp: number;
    humi: number;
    ws: number;
    pm10: {
      grade: string;
      value: number;
    };
    pm25: {
      grade: string;
      value: number;
    };
    light: number;
    co2: number;
    wd: number;
  }[];
};

export type GetWeatherHeaderResponseType = {
  date: string;
  pm10: string;
  pm25: string;
  ws: number;
  wd: string;
  rainAmt: number;
  temp: number;
  humi: number;
};

export type GetObservationType = 'camera' | 'soilRobot' | 'weatherSensor';
export interface GetObservationParams extends GetNdviInfoParams {
  type: GetObservationType;
  directionType: string;
  values: string;
}

export type CameraWeatherType = {
  code: string;
  name: string;
  status: 'OFFLINE' | 'ONLINE';
  action: '수리중' | '작동중';
};

export type HumiTempType = {
  value: number;
  grade: '매우낮음' | '낮음' | '양호' | '높음' | '매우높음';
  color: string;
};

export type GetSensorStatusResponseType = {
  soil: {
    humi: HumiTempType;
    temp: HumiTempType;
  };
  camera: CameraWeatherType[];
  weather: CameraWeatherType[];
};

export type FanType = {
  name: string;
  state: 'off' | 'on';
  key: string;
};

export type GetSensorSummaryResponseType = {
  date: string;
  ndvi: number;
  sensor: GetSoilSummaryResponseType;
  camera: CameraWeatherType[];
  weather: CameraWeatherType[];
  fan: FanType[];
};

export type HumiTempValueType = {
  name: string;
  range: number[];
  color: string;

  isColorPickerVisible: boolean;
};
export type GetGradeValueResponseType = {
  humi: HumiTempValueType[];
  temp: HumiTempValueType[];
};

export type NdviCameraType = {
  date: string;
  ndviDaily: number;
  ndviMa5: number;
  dailyUrl: string;
  ma5Url: string;
  status: string;
};
export type GetNdviCameraResponseType = {
  east: NdviCameraType;
  west: NdviCameraType;
  south: NdviCameraType;
};
export type NdviImageType = {
  tm: string;
  now: string;
  predict: string;
};

export type GetFieldImageResponseType = {
  captureDate: string;
  east: string[];
  west: string[];
  south: string[];
};

export type GetNdviImageResponseType = {
  east: NdviImageType[];
  west: NdviImageType[];
  south: NdviImageType[];
};

export type DirectionType = 'west' | 'south' | 'east';

export type GetNdviChartResponseType = {
  dates: string[];
  c001: number[];
  c002: number[];
  c003: number[];
};
