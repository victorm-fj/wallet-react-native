import { all } from 'redux-saga/effects';
import { userSagas } from './UserSagas';
import { authSagas } from './AuthSagas';
import { accountsSagas } from './AccountsSagas';

const sagas = [authSagas, userSagas, accountsSagas];

// export const initSagas = sagaMiddleware =>
//   sagas.forEach(sagaMiddleware.run.bind(sagaMiddleware));

//   // foo.js
// export const fooSagas = [
//   takeEvery("FOO_A", fooASaga),
//   takeEvery("FOO_B", fooBSaga),
// ]

// // bar.js
// export const barSagas = [
//   takeEvery("BAR_A", barASaga),
//   takeEvery("BAR_B", barBSaga),
// ];

// // index.js
// import { fooSagas } from './foo';
// import { barSagas } from './bar';

// export default function* rootSaga() {
//   yield all([helloSaga]);
// }

export default function* rootSaga() {
  try {
    yield all(sagas);
  } catch (error) {
    console.log(error);
  }
}