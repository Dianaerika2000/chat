import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';
import AuthService from '../../config/auth.service';
import { storageSave, storageDelete, storageGet } from '../../services/storage';

import actions from './actions';

const history = createBrowserHistory();

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function* ({ payload }) {
    const result = yield call(AuthService.login, payload.user);
    if (result.success) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: result.token,
        user: result.user ? result.user : {},
      });
    } else {
      yield put({ type: actions.LOGIN_ERROR });
    }
  });
}
export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    yield storageSave('id_token', payload.token);
    yield storageSave('user', payload.user);
  });
}
export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () {
    yield storageDelete('user');
    yield storageDelete('id_token');
  });
  // If users in the app should be logged in redirect to login page here >>>>
}
export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    yield storageDelete('user');
    yield storageDelete('id_token');
    history.push('/');
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const token = storageGet('id_token');
    const user = storageGet('user');
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        user,
      });
    } else {
      yield put({ type: actions.LOGIN_ERROR });
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
