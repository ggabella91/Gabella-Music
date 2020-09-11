import SpotifyActionTypes from './spotify.types';

const INITIAL_STATE = {
  isConnected: false,
  lastTokenRefresh: null,
  photo: '',
  topArtistsLongTerm: [],
  topArtistsMediumTerm: [],
  topArtistsShortTerm: [],
  topTracks: [],
  error: null,
};

const SpotifyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SpotifyActionTypes.MARK_CONNECTED:
      return {
        ...state,
        isConnected: true,
        error: null,
        lastTokenRefresh: action.payload.latestRefresh,
        photo: action.payload.photo,
      };
    case SpotifyActionTypes.REFRESH_AUTH_TOKEN_SUCCESS:
      return {
        ...state,
        lastTokenRefresh: action.payload,
      };
    case SpotifyActionTypes.CONNECT_FAILURE:
      return {
        ...state,
        isConnected: false,
        error: action.payload,
      };
    case SpotifyActionTypes.FETCH_TOP_ARTISTS_LONG_TERM_SUCCESS:
      return {
        ...state,
        topArtistsLongTerm: action.payload,
        error: null,
      };
    case SpotifyActionTypes.FETCH_TOP_ARTISTS_MEDIUM_TERM_SUCCESS:
      return {
        ...state,
        topArtistsMediumTerm: action.payload,
        error: null,
      };
    case SpotifyActionTypes.FETCH_TOP_ARTISTS_SHORT_TERM_SUCCESS:
      return {
        ...state,
        topArtistsShortTerm: action.payload,
        error: null,
      };
    case SpotifyActionTypes.FETCH_TOP_TRACKS_SUCCESS:
      return {
        ...state,
        topTracks: action.payload,
        error: null,
      };
    case SpotifyActionTypes.FETCH_TOP_ARTISTS_FAILURE:
    case SpotifyActionTypes.FETCH_TOP_TRACKS_FAILURE:
    case SpotifyActionTypes.REFRESH_AUTH_TOKEN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default SpotifyReducer;
