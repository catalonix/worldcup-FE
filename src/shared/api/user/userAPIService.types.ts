import { ApiResponse, Pagination } from '../common.types';

export interface User {
  userId: string;
  groupCode: string;
  userName: string;
  hp: string;
  dept: string;
  regDate: string;
  userCode: string;
}

export type GetUserListResponseData = Pagination<User[]>;

export type GetUserListResponseType = ApiResponse<GetUserListResponseData>;
