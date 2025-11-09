import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './userSlice';

export type Message = {
  id: string;
  roomId: string;
  userId: string;
  text: string;
  ts: number;
  name: string;
  avatar: string;
};
export type Room = { id: string; name: string; messages: Message[] };

const slice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [] as Room[],
    currentRoomId: null as string | null,
    userId: null as string | null,
    users: [] as UserState[],
  },
  reducers: {
    setInitialState(state, action: PayloadAction<{ userId: string; rooms: Room[] }>) {
      state.userId = action.payload.userId;
      state.rooms = action.payload.rooms;
    },
    newMessage(state, action: PayloadAction<Message>) {
      const r = state.rooms.find((x) => x.id === action.payload.roomId);
      if (r) r.messages.push(action.payload);
    },
    joinRoom(state, action: PayloadAction<{ roomId: string }>) {
      state.currentRoomId = action.payload.roomId;
    },
    setUsers(state, action: PayloadAction<UserState[]>) {
      state.users = action.payload;
    },
    sendMessage(_: any, __: PayloadAction<{ roomId: string; text: string }>) {},
  },
});
export const { setInitialState, newMessage, joinRoom, sendMessage, setUsers } = slice.actions;
export default slice.reducer;
