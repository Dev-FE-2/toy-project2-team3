import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  TeamData,
  CurrentSchedule,
  TargetSchedule,
  ModalType,
} from '../../pages/user/Schedule/core/schedule';

interface ScheduleState {
  currentMonth: number;
  currentYear: number;
  isSixWeek: boolean;
  targetSchedule: TargetSchedule;
  modalType: ModalType;
  isModalOpen: boolean;
  teamData: TeamData[];
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
    index: 0,
    name: '',
    userId: '',
  },
  modalType: 'C',
  isModalOpen: false,
  teamData: [],
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
    setTeamData: (state, action: PayloadAction<TeamData[]>) => {
      state.teamData = action.payload;
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
  setTeamData,
  setCurrentSchedule,
  setIsDayClick,
  setClickedDate,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
