import SpotifyActionTypes from './spotify.types';

export const markConnected = (spotifyState) => ({
  type: SpotifyActionTypes.MARK_CONNECTED,
  payload: spotifyState,
});

export const connectFailure = (error) => ({
  type: SpotifyActionTypes.CONNECT_FAILURE,
  payload: error,
});

export const checkConnection = () => ({
  type: SpotifyActionTypes.CHECK_CONNECTION,
});
