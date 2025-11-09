import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import roomsReducer from 'store/slices/roomsSlice';
import userReducer from 'store/slices/userSlice';
import themeReducer from 'store/slices/themeSlice';
import uiReducer from 'store/slices/uiSlice';
import rootSaga from './rootSaga';

const saga = createSagaMiddleware();
export const store = configureStore({
  reducer: { rooms: roomsReducer, user: userReducer, theme: themeReducer, ui: uiReducer },
  middleware: (getDefault) => getDefault({ thunk: false }).concat(saga),
});

saga.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
