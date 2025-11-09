import { eventChannel, EventChannel } from 'redux-saga';
import { call, take, put, fork, takeEvery, select, delay } from 'redux-saga/effects';
import { setInitialState, newMessage, sendMessage, joinRoom, setUsers } from '../slices/roomsSlice';
import { setUserId, setUserName } from '../slices/userSlice';
import { RootState } from '..';
import { triggerConfetti } from 'store/slices/uiSlice';

type ServerMessage =
  | { type: 'INITIAL_STATE'; data: any }
  | { type: 'NEW_MESSAGE'; data: any }
  | { type: 'ROOM_JOINED'; data: any }
  | { type: 'USER_LIST'; data: any }
  | { type: 'WS_CLOSED'; data: any };

let socket: WebSocket | null = null;

function createSocketChannel(ws: WebSocket): EventChannel<ServerMessage> {
  return eventChannel((emit) => {
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        emit(data);
      } catch (e) {
        console.error('WS parse error', e);
      }
    };
    ws.onerror = (err) => {
      console.error('WS error', err);
    };
    ws.onclose = () => {
      console.warn('⚠️ WS closed');
      emit({ type: 'WS_CLOSED' } as any);
    };

    return () => ws.close();
  });
}

function* connectSocket() {
  while (true) {
    try {
      socket = new WebSocket('ws://localhost:4000');

      yield new Promise<void>((resolve) => {
        socket!.onopen = () => {
          console.log('✅ WS connected');
          resolve();
        };
      });

      const channel: EventChannel<ServerMessage> = yield call(createSocketChannel, socket);

      yield call(sendUserInit);

      while (true) {
        const action: ServerMessage = yield take(channel);
        if (action.type === 'WS_CLOSED') throw new Error('Socket closed');

        switch (action.type) {
          case 'INITIAL_STATE':
            yield put(setInitialState(action.data));
            yield put(setUserId(action.data.userId));

            if (action.data.rooms?.length > 0) {
              const firstRoomId = action.data.rooms[0].id;
              yield put(joinRoom({ roomId: firstRoomId }));
            }

            break;
          case 'NEW_MESSAGE': {
            yield put(newMessage(action.data));

            const currentUserId: string = yield select((s: RootState) => s.user.id);
            const currentRoomId: string | null = yield select(
              (s: RootState) => s.rooms.currentRoomId,
            );
            const { roomId, userId } = action.data;

            if (roomId === currentRoomId && userId !== currentUserId) {
              yield put(triggerConfetti());
            }

            break;
          }
          case 'ROOM_JOINED':
            break;
          case 'USER_LIST':
            yield put(setUsers(action.data));
            break;
          default:
            break;
        }
      }
    } catch (err) {
      console.warn('🔁 WS reconnecting in 2s...', err);
      yield delay(2000);
    }
  }
}

function* sendUserInit() {
  const { id, name }: { id: string | null; name: string } = yield select((s: RootState) => s.user);

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        type: 'INIT',
        data: { userId: id, name },
      }),
    );
  }
}

function* handleSendUserName(action: ReturnType<typeof setUserName>) {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;

  const name: string = yield select((s: RootState) => s.user.name);
  socket.send(
    JSON.stringify({
      type: 'SET_NAME',
      data: { name },
    }),
  );
}

function* handleSendMessage(action: ReturnType<typeof sendMessage>) {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;
  const userId: string | null = yield select((s: RootState) => s.user.id);
  socket.send(
    JSON.stringify({
      type: 'CREATE_MESSAGE',
      data: { roomId: action.payload.roomId, text: action.payload.text, userId },
    }),
  );
}

function* handleJoinRoom(action: ReturnType<typeof joinRoom>) {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;
  socket.send(
    JSON.stringify({
      type: 'JOIN_ROOM',
      data: { roomId: action.payload.roomId },
    }),
  );
}

export default function* socketSaga() {
  yield fork(connectSocket);
  yield takeEvery(sendMessage.type, handleSendMessage);
  yield takeEvery(setUserName.type, handleSendUserName);
  yield takeEvery(joinRoom.type, handleJoinRoom);
}
