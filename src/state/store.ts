import { configureStore } from '@reduxjs/toolkit';
import {
  counterReducer,
  userReducer,
  paginationReducer,
  scheduleReducer,
  navigationReducer,
} from '../slices/reducer';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    pagination: paginationReducer,
    schedule: scheduleReducer,
    navigation: navigationReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
