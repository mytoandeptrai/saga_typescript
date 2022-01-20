import { takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

export function* log(action: PayloadAction) {
  console.log('Log', action);
}

export default function* couterSaga() {
  console.log('Hello couterSaga');
  yield takeEvery('counter/increment', log);
}
