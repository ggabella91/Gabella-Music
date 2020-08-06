import SpotifyActionTypes from './spotify.types';

export const markConnected = (spotifyState) => ({
  type: SpotifyActionTypes.MARK_CONNECTED,
  payload: spotifyState,
});
