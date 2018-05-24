import { take, all, call, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_ACCOUNTS_ASYNC,
  FETCH_DATA_ASYNC,
  LOGIN_USER_ASYNC,
  REGISTER_USER_ASYNC,
  UPDATE_AUTH_FORM_STATE,
  APP_LOAD_FINISH,
} from './../types';

import AuthService from './../../services/authService';

function* loginUser(action) {
  try {
    let responseJson = yield call(AuthService.login, action.payload);

    if (responseJson.status === 'success') {
      yield put({
        type: LOGIN_USER_ASYNC.success,
        payload: responseJson.data.token,
      });
    } else {
      yield put({
        type: LOGIN_USER_ASYNC.error,
        payload: responseJson.message,
      });
      yield put({
        type: UPDATE_AUTH_FORM_STATE,
        payload: {
          inputState: 'email',
          authState: 'login',
          textFooterRight: 'Next',
        },
      });
    }
  } catch (error) {
    yield put({ type: LOGIN_USER_ASYNC.error, error });
  }
  // let twoFactorResponse = await AuthService.twoFactorAuth();
  // if (twoFactorResponse.status === 'success') {
  //   const authInfo = twoFactorResponse.data;
  //   if (authInfo.sms === true || authInfo.token === true) {
  //     this.props.navigation.navigate('AuthVerifySms', {
  //       loginInfo: loginInfo,
  //       isTwoFactor: true,
  //     });
  //   } else {
  //     Auth.login(this.props.navigation, loginInfo);
  //   }
  // } else {
  //   Alert.alert('Error', twoFactorResponse.message, [{ text: 'OK' }]);
  // }
}

function* registerUser(action) {
  try {
    let responseJson = yield call(AuthService.signup, action.payload);

    if (responseJson.status === 'success') {
      yield put({
        type: REGISTER_USER_ASYNC.success,
        payload: responseJson.data.token,
      });
    } else {
      console.log(responseJson);
      yield put({
        type: REGISTER_USER_ASYNC.error,
        payload: responseJson.message,
      });
      yield put({
        type: UPDATE_AUTH_FORM_STATE,
        payload: {
          inputState: 'email',
          authState: 'register',
          textFooterRight: 'Next',
        },
      });
    }
  } catch (error) {
    console.log(responseJson);
    yield put({ type: REGISTER_USER_ASYNC.FAIL, error });
  }
}

function* appLoad() {
  try {
    yield all([
      put({ type: FETCH_ACCOUNTS_ASYNC.pending }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'profile' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'mobile_number' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'email_address' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'crypto_address' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'bank_account' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'address' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'document' }),
    ]);
    for (let i = 0; i < 8; i++) {
      yield take([FETCH_ACCOUNTS_ASYNC.success, FETCH_DATA_ASYNC.success]);
    }
    yield put({ type: APP_LOAD_FINISH });
  } catch (error) {
    console.log(error);
    yield put({ type: LOGIN_USER_ASYNC.error, error });
  }
}

export const authSagas = all([
  takeEvery(LOGIN_USER_ASYNC.success, appLoad),
  takeEvery(LOGIN_USER_ASYNC.pending, loginUser),
  takeEvery(REGISTER_USER_ASYNC.success, appLoad),
  takeEvery(REGISTER_USER_ASYNC.pending, registerUser),
]);