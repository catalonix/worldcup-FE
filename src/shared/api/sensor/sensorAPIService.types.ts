export interface GetNdviInfoParams {
  startDate?: string;
  endDate?: string;
}

export type GetNdviInfoResponseType = {
  dates: string[];
  data: { key: string; name: string; data: number[] }[];
};
