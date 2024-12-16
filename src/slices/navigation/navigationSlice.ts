import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  activeIndex: number | null;
  expandedSalary: boolean;
}

const initialState: NavigationState = {
  activeIndex: null,
  expandedSalary: false,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveIndex(state, action: PayloadAction<number | null>) {
      state.activeIndex = action.payload;
    },
    toggleExpandedSalary(state) {
      state.expandedSalary = !state.expandedSalary;
    },
    resetSalaryExpansion(state) {
      state.expandedSalary = false;
    },
  },
});

export const { setActiveIndex, toggleExpandedSalary, resetSalaryExpansion } =
  navigationSlice.actions;

export default navigationSlice.reducer;
