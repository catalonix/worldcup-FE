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
  rain_amt: number;
  temp: number;
  humi: number;
};

export type GetObservationType = 'camera' | 'soilRobot' | 'weatherSensor';
export interface GetObservationParams extends GetNdviInfoParams {
  type: GetObservationType;
  directionType: string;
  values: string;
}
