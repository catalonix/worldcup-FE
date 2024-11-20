import { SelectOptionTypes } from 'common/types';

export interface CalendarStore {
  mainTypes: SelectOptionTypes[];
  subTypes: { parentValue: string; children: SelectOptionTypes[] }[];
}

export interface CalendarDispatcher extends CalendarStore {
  dispatchMainTypes: (value: SelectOptionTypes[]) => void;
  dispatchSubTypes: (value: { parentValue: string; children: SelectOptionTypes[] }[]) => void;
  clear: () => void;
}
