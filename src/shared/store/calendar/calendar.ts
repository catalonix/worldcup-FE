import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { CalendarDispatcher, CalendarStore } from './calendar.types';
import { SelectOptionTypes } from 'common/types';

const initialState: CalendarStore = {
  mainTypes: [],
  subTypes: []
};

export const useCalendarStore = create(
  persist(
    immer<CalendarDispatcher>(set => ({
      ...initialState,
      dispatchMainTypes: (value: SelectOptionTypes[]) => {
        set({ mainTypes: value });
      },
      dispatchSubTypes: (value: { parentValue: string; children: SelectOptionTypes[] }[]) => {
        set({ subTypes: value });
      },
      clear: () => set(initialState)
    })),
    {
      name: 'calendarStore'
    }
  )
);
