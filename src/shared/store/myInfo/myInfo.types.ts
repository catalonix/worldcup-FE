import { User } from 'shared/api/user/userAPIService.types';

export interface MyInfoState {
  isLogin: boolean;
  myInfo: User;
}

export interface MyInfoDispatcher extends MyInfoState {
  dispatchIsLogin: (value: boolean) => void;
  dispatchMyInfo: (value: User) => void;
  clear: () => void;
}
