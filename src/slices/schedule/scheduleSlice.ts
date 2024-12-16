import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  TeamData,
  CurrentSchedule,
  TargetSchedule,
  ModalType,
  ScheduleData,
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
  scheduleData: ScheduleData[];
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
  teamData: [],
  currentSchedule: {
    type: '',
    teamId: [],
    userId: '',
  },
  isDayClick: false,
  clickedDate: [],
  scheduleData: [],
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
    setScheduleData: (state, action: PayloadAction<ScheduleData[]>) => {
      state.scheduleData = action.payload;
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
  setScheduleData,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
