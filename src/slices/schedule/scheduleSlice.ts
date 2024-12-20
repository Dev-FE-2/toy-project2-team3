import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  CurrentSchedule,
  TargetSchedule,
  ModalType,
} from '../../types/schedule';

interface ScheduleState {
  currentMonth: number;
  currentYear: number;
  isSixWeek: boolean;
  targetSchedule: TargetSchedule;
  modalType: ModalType;
  isModalOpen: boolean;
  currentSchedule: CurrentSchedule;
  isDayClick: boolean;
  clickedDate: number[];
}

const initialState: ScheduleState = {
  currentMonth: new Date().getMonth() + 1,
  currentYear: new Date().getFullYear(),
  isSixWeek: false,
  targetSchedule: {
    createdAt: '',
    detail: '',
    endedAt: '',
    startedAt: '',
    title: '',
    updatedAt: '',
    documentName: '',
    documentUrl: '',
    id: '',
    name: '',
    userId: '',
  },
  modalType: 'C',
  isModalOpen: false,
  currentSchedule: {
    type: '',
    teamId: [],
    userId: '',
  },
  isDayClick: false,
  clickedDate: [],
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setCurrentMonth: (state, action: PayloadAction<number>) => {
      state.currentMonth = action.payload;
    },
    setCurrentYear: (state, action: PayloadAction<number>) => {
      state.currentYear = action.payload;
    },
    setIsSixWeek: (state, action: PayloadAction<boolean>) => {
      state.isSixWeek = action.payload;
    },
    setTargetSchedule: (state, action: PayloadAction<TargetSchedule>) => {
      state.targetSchedule = action.payload;
    },
    setModalType: (state, action: PayloadAction<ModalType>) => {
      state.modalType = action.payload;
    },
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setCurrentSchedule: (state, action: PayloadAction<CurrentSchedule>) => {
      state.currentSchedule = action.payload;
    },
    setIsDayClick: (state, action: PayloadAction<boolean>) => {
      state.isDayClick = action.payload;
    },
    setClickedDate: (state, action: PayloadAction<number[]>) => {
      state.clickedDate = action.payload;
    },
  },
});

export const {
  setCurrentMonth,
  setCurrentYear,
  setIsSixWeek,
  setTargetSchedule,
  setModalType,
  setIsModalOpen,
  setCurrentSchedule,
  setIsDayClick,
  setClickedDate,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
