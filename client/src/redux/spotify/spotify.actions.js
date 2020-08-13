import SpotifyActionTypes from './spotify.types';

export const markConnected = (latestRefresh) => ({
  type: SpotifyActionTypes.MARK_CONNECTED,
  payload: latestRefresh,
});

export const connectFailure = (error) => ({
  type: SpotifyActionTypes.CONNECT_FAILURE,
  payload: error,
});

export const refreshAuthTokenStart = () => ({
  type: SpotifyActionTypes.REFRESH_AUTH_TOKEN_START,
});

export const refreshAuthTokenSuccess = () => ({
  type: SpotifyActionTypes.REFRESH_AUTH_TOKEN_SUCCESS,
});

export const refreshAuthTokenFailure = (error) => ({
  type: SpotifyActionTypes.REFRESH_AUTH_TOKEN_FAILURE,
  payload: error,
});

export const checkConnection = () => ({
  type: SpotifyActionTypes.CHECK_CONNECTION,
});

export const fetchTopArtistsStart = (endpoint) => ({
  type: SpotifyActionTypes.FETCH_TOP_ARTISTS_START,
  payload: endpoint,
});

export const fetchTopArtistsSuccess = (endpointData) => ({
  type: SpotifyActionTypes.FETCH_TOP_ARTISTS_SUCCESS,
  payload: endpointData,
});

export const fetchTopArtistsFailure = (error) => ({
  type: SpotifyActionTypes.FETCH_TOP_ARTISTS_FAILURE,
  payload: error,
});
