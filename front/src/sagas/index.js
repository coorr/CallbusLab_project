import { all ,fork } from 'redux-saga/effects';
import axios from 'axios';

import userSage from './user';
import itemSage from './item';

export default function* rootSaga() {
  yield all([
    fork(userSage),
    fork(itemSage),
  ])
}