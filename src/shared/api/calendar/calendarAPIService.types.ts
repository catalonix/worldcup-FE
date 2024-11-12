export interface GetCalendarListParams {
  date: string;
  types: string;
}

export type GetCalendarListResponseType = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  type: '오전' | '오후';
}[];
