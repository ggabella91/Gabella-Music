import { createSelector } from 'reselect';

const selectSpotifyState = (state) => state.spotifyState;

export const selectIsConnected = createSelector(
  [selectSpotifyState],
  (spotifyState) => spotifyState.isConnected
);

export const selectPhoto = createSelector(
  [selectSpotifyState],
  (spotifyState) => spotifyState.photo
);

export const selectLastTokenRefresh = createSelector(
  [selectSpotifyState],
  (spotifyState) => spotifyState.lastTokenRefresh
);

export const selectTopArtistsLongTerm = createSelector(
  [selectSpotifyState],
  (spotifyState) => spotifyState.topArtistsLongTerm
);

export const selectTopArtistsMediumTerm = createSelector(
  [selectSpotifyState],
  (spotifyState) => spotifyState.topArtistsMediumTerm
);

export const selectTopArtistsShortTerm = createSelector(
  [selectSpotifyState],
  (spotifyState) => spotifyState.topArtistsShortTerm
);

export const selectTopTracks = createSelector(
  [selectSpotifyState],
  (spotifyState) => spotifyState.topTracks
);
