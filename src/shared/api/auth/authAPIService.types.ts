import { ApiResponse } from '../common.types';

export interface LoginParams {
  userId: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
}

export type LoginResponseType = ApiResponse<LoginResponseData>;
