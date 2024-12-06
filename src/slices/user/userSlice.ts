import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 사용자 상태 타입 정의
interface UserState {
  isLoggedIn: boolean;
  userInfo: {
    id: string | null;
    name: string | null;
    email: string | null;
  };
}

// 초기 상태
const initialState: UserState = {
  isLoggedIn: false,
  userInfo: {
    id: null,
    name: null,
    email: null,
  },
};

// Slice 생성
const userSlice = createSlice({
  name: 'user', // Slice 이름
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ id: string; name: string; email: string }>
    ) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload; // 전달받은 사용자 정보 저장
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = { id: null, name: null, email: null };
    },
  },
});

// 액션 생성자 및 리듀서 내보내기
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
