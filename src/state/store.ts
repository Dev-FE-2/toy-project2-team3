import { configureStore } from '@reduxjs/toolkit';
import { counterReducer, userReducer } from '../slices/reducer';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
