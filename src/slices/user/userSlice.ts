import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 사용자 상태 타입 정의
interface UserState {
  isLoggedIn: boolean;
  userInfo: {
    userId: string | null;
    name: string | null;
    email: string | null;
    profileImgUrl: string | null;
    team: string | null;
    position: string | null;
    department: string | null;
    isAdmin: boolean;
    isActivated: boolean;
  };
}

// 세션스토리지에서 상태 가져오기
const storgedData = sessionStorage.getItem('user');
const savedUserInfo = storgedData && JSON.parse(storgedData);

// 초기 상태
const initialState: UserState = savedUserInfo
  ? savedUserInfo
  : {
      isLoggedIn: false,
      userInfo: {
        userId: null,
        name: null,
        email: null,
        profileImgUrl: null,
        team: null,
        position: null,
        department: null,
        isAdmin: null,
        isActivated: null,
      },
    };

// Slice 생성
const userSlice = createSlice({
  name: 'user', // Slice 이름
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState['userInfo']>) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload; // 전달받은 사용자 정보 저장
      sessionStorage.setItem(
        'user',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userInfo: state.userInfo,
        })
      );
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = {
        userId: null,
        name: null,
        email: null,
        profileImgUrl: null,
        team: null,
        position: null,
        department: null,
        isAdmin: false,
        isActivated: false,
        employeeNumber: null,
      };
      sessionStorage.removeItem('user');
    },
  },
});

// 액션 생성자 및 리듀서 내보내기
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
