import SpotifyActionTypes from './spotify.types';

export const markConnected = (latestRefresh, photo) => ({
  type: SpotifyActionTypes.MARK_CONNECTED,
  payload: { latestRefresh },
});

export const connectFailure = (error) => ({
  type: SpotifyActionTypes.CONNECT_FAILURE,
  payload: error,
});

export const refreshAuthTokenStart = () => ({
  type: SpotifyActionTypes.REFRESH_AUTH_TOKEN_START,
});

export const refreshAuthTokenSuccess = (latestRefresh) => ({
  type: SpotifyActionTypes.REFRESH_AUTH_TOKEN_SUCCESS,
  payload: latestRefresh,
});

export const refreshAuthTokenFailure = (error) => ({
  type: SpotifyActionTypes.REFRESH_AUTH_TOKEN_FAILURE,
  payload: error,
});

export const checkConnection = () => ({
  type: SpotifyActionTypes.CHECK_CONNECTION,
});

export const fetchUserInfoStart = () => ({
  type: SpotifyActionTypes.FETCH_USER_INFO_START
});

export const fetchUserInfoSuccess = (userInfo) => ({
  type: SpotifyActionTypes.FETCH_USER_INFO_SUCCESS,
  payload: userInfo
});

export const fetchUserInfoFailure = (error) => ({
  type: SpotifyActionTypes.FETCH_USER_INFO_FAILURE,
  payload: error
});

export const fetchTopArtistsLongTermStart = (endpoint) => ({
  type: SpotifyActionTypes.FETCH_TOP_ARTISTS_LONG_TERM_START,
  payload: endpoint,
});

export const fetchTopArtistsMediumTermStart = (endpoint) => ({
  type: SpotifyActionTypes.FETCH_TOP_ARTISTS_MEDIUM_TERM_START,
  payload: endpoint,
});

export const fetchTopArtistsShortTermStart = (endpoint) => ({
  type: SpotifyActionTypes.FETCH_TOP_ARTISTS_SHORT_TERM_START,
  payload: endpoint,
});

export const fetchTopArtistsLongTermSuccess = (endpointData) => ({
  type: SpotifyActionTypes.FETCH_TOP_ARTISTS_LONG_TERM_SUCCESS,
  payload: endpointData,
});

export const fetchTopArtistsMediumTermSuccess = (endpointData) => ({
  type: SpotifyActionTypes.FETCH_TOP_ARTISTS_MEDIUM_TERM_SUCCESS,
  payload: endpointData,
});

export const fetchTopArtistsShortTermSuccess = (endpointData) => ({
  type: SpotifyActionTypes.FETCH_TOP_ARTISTS_SHORT_TERM_SUCCESS,
  payload: endpointData,
});

export const fetchTopArtistsFailure = (error) => ({
  type: SpotifyActionTypes.FETCH_TOP_ARTISTS_FAILURE,
  payload: error,
});

export const fetchTopTracksLongTermStart = (endpoint) => ({
  type: SpotifyActionTypes.FETCH_TOP_TRACKS_LONG_TERM_START,
  payload: endpoint,
});

export const fetchTopTracksMediumTermStart = (endpoint) => ({
  type: SpotifyActionTypes.FETCH_TOP_TRACKS_MEDIUM_TERM_START,
  payload: endpoint,
});

export const fetchTopTracksShortTermStart = (endpoint) => ({
  type: SpotifyActionTypes.FETCH_TOP_TRACKS_SHORT_TERM_START,
  payload: endpoint,
});

export const fetchTopTracksLongTermSuccess = (endpointData) => ({
  type: SpotifyActionTypes.FETCH_TOP_TRACKS_LONG_TERM_SUCCESS,
  payload: endpointData,
});

export const fetchTopTracksMediumTermSuccess = (endpointData) => ({
  type: SpotifyActionTypes.FETCH_TOP_TRACKS_MEDIUM_TERM_SUCCESS,
  payload: endpointData,
});

export const fetchTopTracksShortTermSuccess = (endpointData) => ({
  type: SpotifyActionTypes.FETCH_TOP_TRACKS_SHORT_TERM_SUCCESS,
  payload: endpointData,
});

export const fetchTopTracksFailure = (error) => ({
  type: SpotifyActionTypes.FETCH_TOP_TRACKS_FAILURE,
  payload: error,
});

export const disconnectStart = () => ({
  type: SpotifyActionTypes.DISCONNECT_START
});

export const disconnectSuccess = (isConnected) => ({
  type: SpotifyActionTypes.DISCONNECT_SUCCESS,
  payload: isConnected
});

export const disconnectFailure = (error) => ({
  type: SpotifyActionTypes.DISCONNECT_FAILURE,
  payload: error
});