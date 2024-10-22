export interface LoginParams {
  userId: string;
  password: string;
  remember?: boolean;
}

export type LoginResponseType = {
  access: string;
  refresh: string;
};
