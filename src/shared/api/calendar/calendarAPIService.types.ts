export interface GetCalendarListParams {
  date: string;
  types: string;
}

export type GetCalendarListItemType = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  type: '오전' | '오후' | '일정명';
  bgColor: string;
};

export type GetCalendarListResponseType = GetCalendarListItemType[];
