import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { MyInfoDispatcher, MyInfoState } from './myInfo.types';

const initialState: MyInfoState = {
  isLogin: false,
  userId: '',
  userName: '',
  hp: '',
  dept: '',
  userCode: ''
};

export const useMyInfoStore = create(
  persist(
    immer<MyInfoDispatcher>(set => ({
      ...initialState,
      dispatchIsLogin: (value: boolean) => {
        set({ isLogin: value });
      },
      dispatchMyInfo: (value: MyInfoState) => {
        set({ ...value });
      },
      clear: () => set(initialState)
    })),
    {
      name: 'myInfoStore'
    }
  )
);
