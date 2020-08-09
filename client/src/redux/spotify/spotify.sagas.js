import { takeLatest, put, all, call } from 'redux-saga/effects';

import SpotifyActionTypes from './spotify.types';

import { markConnected, connectFailure } from './spotify.actions';

import axios from 'axios';

export function* isConnected() {
  try {
    const userConnected = yield axios.get(
      'http://localhost:8000/api/v1/users/isConnectedToSpotify'
    );

    if (!userConnected.status) return;
    yield put(markConnected());
  } catch (err) {
    yield put(connectFailure(err.response.data.status));
  }
}

export function* onCheckConnection() {
  yield takeLatest(SpotifyActionTypes.CHECK_CONNECTION, isConnected);
}

export function* spotifySagas() {
  yield all([call(onCheckConnection)]);
}
