import { takeLatest, put, all, call } from 'redux-saga/effects';

import SpotifyActionTypes from './spotify.types';

import {
  markConnected,
  connectFailure,
  refreshAuthTokenSuccess,
  refreshAuthTokenFailure,
  fetchTopArtistsLongTermSuccess,
  fetchTopArtistsMediumTermSuccess,
  fetchTopArtistsShortTermSuccess,
  fetchTopArtistsFailure,
  fetchTopTracksLongTermSuccess,
  fetchTopTracksMediumTermSuccess,
  fetchTopTracksShortTermSuccess,
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

    if (stateProps === 'topArtistsLongTerm') {
      yield put(fetchTopArtistsLongTermSuccess(endpointData));
    } else if (stateProps === 'topArtistsMediumTerm') {
      yield put(fetchTopArtistsMediumTermSuccess(endpointData));
    } else if (stateProps === 'topArtistsShortTerm') {
      yield put(fetchTopArtistsShortTermSuccess(endpointData));
    } else if (stateProps === 'topTracksLongTerm') {
      yield put(fetchTopTracksLongTermSuccess(endpointData));
    } else if (stateProps === 'topTracksMediumTerm') {
      yield put(fetchTopTracksMediumTermSuccess(endpointData));
    } else if (stateProps === 'topTracksShortTerm') {
      yield put(fetchTopTracksShortTermSuccess(endpointData));
    }
  } catch (err) {
    if (stateProps.match(/topArtists/)) {
      yield put(fetchTopArtistsFailure(err.message));
    } else if (stateProps.match(/topTracks/)) {
      yield put(fetchTopTracksFailure(err.message));
    }
  }
}

export function* fetchTopArtistsLongTermStart(
  endpoint,
  stateProps = 'topArtistsLongTerm'
) {
  yield takeLatest(
    SpotifyActionTypes.FETCH_TOP_ARTISTS_LONG_TERM_START,
    fetchEndpointDataAsync,
    (endpoint = 'me/top/artists?time_range=long_term'),
    stateProps
  );
}

export function* fetchTopArtistsMediumTermStart(
  endpoint,
  stateProps = 'topArtistsMediumTerm'
) {
  yield takeLatest(
    SpotifyActionTypes.FETCH_TOP_ARTISTS_MEDIUM_TERM_START,
    fetchEndpointDataAsync,
    (endpoint = 'me/top/artists?time_range=medium_term'),
    stateProps
  );
}

export function* fetchTopArtistsShortTermStart(
  endpoint,
  stateProps = 'topArtistsShortTerm'
) {
  yield takeLatest(
    SpotifyActionTypes.FETCH_TOP_ARTISTS_SHORT_TERM_START,
    fetchEndpointDataAsync,
    (endpoint = 'me/top/artists?time_range=short_term'),
    stateProps
  );
}

export function* fetchTopTracksLongTermStart(
  endpoint,
  stateProps = 'topTracksLongTerm'
) {
  yield takeLatest(
    SpotifyActionTypes.FETCH_TOP_TRACKS_LONG_TERM_START,
    fetchEndpointDataAsync,
    (endpoint = 'me/top/tracks?time_range=long_term'),
    stateProps
  );
}

export function* fetchTopTracksMediumTermStart(
  endpoint,
  stateProps = 'topTracksMediumTerm'
) {
  yield takeLatest(
    SpotifyActionTypes.FETCH_TOP_TRACKS_MEDIUM_TERM_START,
    fetchEndpointDataAsync,
    (endpoint = 'me/top/tracks?time_range=medium_term'),
    stateProps
  );
}

export function* fetchTopTracksShortTermStart(
  endpoint,
  stateProps = 'topTracksShortTerm'
) {
  yield takeLatest(
    SpotifyActionTypes.FETCH_TOP_TRACKS_SHORT_TERM_START,
    fetchEndpointDataAsync,
    (endpoint = 'me/top/tracks?time_range=short_term'),
    stateProps
  );
}

export function* spotifySagas() {
  yield all([
    call(onCheckConnection),
    call(refreshAuthTokenStart),
    call(fetchTopArtistsLongTermStart),
    call(fetchTopArtistsMediumTermStart),
    call(fetchTopArtistsShortTermStart),
    call(fetchTopTracksLongTermStart),
    call(fetchTopTracksMediumTermStart),
    call(fetchTopTracksShortTermStart),
  ]);
}
