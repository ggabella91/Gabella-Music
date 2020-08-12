import { createSelector } from 'reselect';

const selectSpotifyState = (state) => state.spotifyState;

export const selectIsConnected = createSelector(
  [selectSpotifyState],
  (spotifyState) => spotifyState.isConnected
);

export const selectTopArtists = createSelector(
  [selectSpotifyState],
  (spotifyState) => spotifyState.topArtists
);
