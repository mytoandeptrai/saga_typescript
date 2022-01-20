import { call, fork, put, take } from 'redux-saga/effects';
import { LoginPayLoad, authActions } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
function* handleLogin(payload: LoginPayLoad) {
  try {
    localStorage.setItem('access_token', 'fake_token');
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'toan',
      })
    );

    // redirect to admin home page

    yield put(push('/admin/dashboard'));
  } catch (err) {
    yield put(authActions.loginFailed('123'));
  }
}

function* handleLogout() {
  localStorage.removeItem('access_token');
  // redirect to login page
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayLoad> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
