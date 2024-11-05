export interface GetNdviInfoParams {
  startDate?: string;
  endDate?: string;
}

export type GetSensorInfoResponseType = {
  dates: string[];
  data: { key: string; name: string; data: number[] }[];
};

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
    pm10: number;
    pm25: number;
    light: number;
    co2: number;
    wd: number;
  }[];
};
