import { Pagination } from '../common.types';
import type { Dayjs } from 'dayjs';

export type UserCode = '' | '0' | '1'; // 0 사용자 1관리자

export type GetUserListRequestType = {
  userCode: UserCode;
  startDate: string | Dayjs;
  endDate: string;
};
export interface User {
  userId: string;
  groupCode: string;
  userName: string;
  hp: string;
  dept: string;
  regDate: string;
  userCode: string;
}

export type GetUserListResponseType = Pagination<User[]>;
