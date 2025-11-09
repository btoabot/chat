import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string | null;
  name: string;
  avatar?: string;
}

const initialState: UserState = {
  id: localStorage.getItem('userId'),
  name: localStorage.getItem('chat_username') || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;

      // TODO: implement middleware for localStorage
      if (!localStorage.getItem('chat_username')) {
        localStorage.setItem('userId', action.payload);
      }
    },

    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      localStorage.setItem('chat_username', action.payload);
    },

    setUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
  },
});

export const { setUserId, setUserName, setUser } = userSlice.actions;
export default userSlice.reducer;
