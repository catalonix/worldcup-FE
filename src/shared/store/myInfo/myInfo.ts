import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { MyInfoDispatcher, MyInfoState } from './myInfo.types';
import { User } from 'shared/api/user/userAPIService.types';

const initialState: MyInfoState = {
  isLogin: false,
  myInfo: { userId: '', userName: '', hp: '', dept: '', userCode: '0' } as User
};

export const useMyInfoStore = create(
  persist(
    immer<MyInfoDispatcher>(set => ({
      ...initialState,
      dispatchIsLogin: (value: boolean) => {
        set({ isLogin: value });
      },
      dispatchMyInfo: (value: User) => {
        set({ myInfo: value });
      },
      clear: () => set(initialState)
    })),
    {
      name: 'myInfoStore'
    }
  )
);
