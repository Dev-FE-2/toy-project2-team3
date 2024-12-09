import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 상태 정의
type PaginationState = {
  currentPage: number;
};

// 초기값 정의
const initialState: PaginationState = {
  currentPage: 1,
};

// Slice 생성
const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

// 액션, reducer 내보내기
export const { setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;
