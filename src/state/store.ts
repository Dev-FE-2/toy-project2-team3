import { configureStore } from '@reduxjs/toolkit';
import {
  counterReducer,
  userReducer,
  paginationReducer,
} from '../slices/reducer';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // 추가

export { setCurrentPage } from '../slices/user/paginationSlice';
export default store;
