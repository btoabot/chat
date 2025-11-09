import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  confettiCounter: number;
  lastConfettiTimestamp: number | null;
}

const initialState: UiState = {
  confettiCounter: 0,
  lastConfettiTimestamp: null,
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    triggerConfetti(state, action: PayloadAction<{ force?: boolean } | undefined>) {
      const now = Date.now();
      const DEBOUNCE_TIME = 3000;

      if (
        !action.payload?.force &&
        state.lastConfettiTimestamp &&
        now - state.lastConfettiTimestamp < DEBOUNCE_TIME
      ) {
        return;
      }

      state.confettiCounter += 1;
      state.lastConfettiTimestamp = now;
    },
  },
});

export const { triggerConfetti } = slice.actions;
export default slice.reducer;
