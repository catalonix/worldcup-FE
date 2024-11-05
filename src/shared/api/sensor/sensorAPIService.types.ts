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
