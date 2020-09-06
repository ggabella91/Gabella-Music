import { takeLatest, put, all, call } from 'redux-saga/effects';

import SpotifyActionTypes from './spotify.types';

import {
  markConnected,
  connectFailure,
  refreshAuthTokenSuccess,
  refreshAuthTokenFailure,
  fetchTopArtistsSuccess,
  fetchTopArtistsFailure,
  fetchTopTracksSuccess,
  fetchTopTracksFailure,
} from './spotify.actions';

import axios from 'axios';

let origin;
if (process.env.NODE_ENV === 'development') {
  origin = 'http://localhost:8000/';
} else {
  origin = '/';
}

export function* isConnected() {
  try {
    const userConnectedRes = yield axios.get(
      `${origin}api/v1/users/isConnectedToSpotify`
    );

    if (!userConnectedRes.status) return;
    yield put(
      markConnected(
        userConnectedRes.data.lastRefresh,
        userConnectedRes.data.photo
      )
    );
  } catch (err) {
    yield put(connectFailure(err.response.data.status));
  }
}

export function* refreshAuthTokenAsync() {
  try {
    const refreshUser = yield axios.get(
      `${origin}api/v1/spotify/refreshToken`,
      {
        withCredentials: true,
      }
    );
    yield put(refreshAuthTokenSuccess(refreshUser.data.lastRefresh));
  } catch (err) {
    yield put(refreshAuthTokenFailure(err));
  }
}

export function* refreshAuthTokenStart() {
  yield takeLatest(
    SpotifyActionTypes.REFRESH_AUTH_TOKEN_START,
    refreshAuthTokenAsync
  );
}

export function* onCheckConnection() {
  yield takeLatest(SpotifyActionTypes.CHECK_CONNECTION, isConnected);
}

export function* fetchEndpointDataAsync(endpoint, stateProps) {
  try {
    const response = yield axios.post(
      `${origin}api/v1/spotify/getEndpointData`,

      {
        endpoint,
        withCredentials: true,
      }
    );

    const endpointData = response.data;

    if (stateProps === 'topArtists') {
      yield put(fetchTopArtistsSuccess(endpointData));
    } else if (stateProps === 'topTracks') {
      yield put(fetchTopTracksSuccess(endpointData));
    }
  } catch (err) {
    if (stateProps === 'topArtists') {
      yield put(fetchTopArtistsFailure(err.message));
    } else if (stateProps === 'topTracks') {
      yield put(fetchTopTracksFailure(err.message));
    }
  }
}

export function* fetchTopArtistsStart(endpoint, stateProps = 'topArtists') {
  yield takeLatest(
    SpotifyActionTypes.FETCH_TOP_ARTISTS_START,
    fetchEndpointDataAsync,
    (endpoint = 'me/top/artists?time_range=long_term'),
    stateProps
  );
}

export function* fetchTopTracksStart(endpoint, stateProps = 'topTracks') {
  yield takeLatest(
    SpotifyActionTypes.FETCH_TOP_TRACKS_START,
    fetchEndpointDataAsync,
    (endpoint = 'me/top/tracks?time_range=long_term'),
    stateProps
  );
}

export function* spotifySagas() {
  yield all([
    call(onCheckConnection),
    call(refreshAuthTokenStart),
    call(fetchTopArtistsStart),
    call(fetchTopTracksStart),
  ]);
}
