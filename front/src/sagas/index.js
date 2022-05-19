import { all ,fork } from 'redux-saga/effects';
import axios from 'axios';

import userSage from './user';

export default function* rootSaga() {
  yield all([
    fork(userSage),
  ])
}