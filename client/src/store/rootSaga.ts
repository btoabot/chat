import { all } from 'redux-saga/effects';
import socketSaga from './sagas/socketSaga';

export default function* rootSaga() {
  yield all([socketSaga()]);
}
