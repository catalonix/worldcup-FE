export interface MyInfoState {
  isLogin: boolean;
  userId: string;
  userName: string;
  hp: string;
  dept: string;
  userCode: string;
}

export interface MyInfoDispatcher extends MyInfoState {
  dispatchIsLogin: (value: boolean) => void;
  dispatchMyInfo: (value: MyInfoState) => void;
  clear: () => void;
}
