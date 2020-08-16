import { createSelector } from 'reselect';

const selectSpotifyState = (state) => state.spotifyState;

export const selectIsConnected = createSelector(
  [selectSpotifyState],
  (spotifyState) => spotifyState.isConnected
);

export const selectLastTokenRefresh = createSelector(
  [selectSpotifyState],
  (spotifyState) => spotifyState.lastTokenRefresh
);

export const selectTopArtists = createSelector(
  [selectSpotifyState],
  (spotifyState) => spotifyState.topArtists
);

export const selectTopTracks = createSelector(
  [selectSpotifyState],
  (spotifyState) => spotifyState.topTracks
);
