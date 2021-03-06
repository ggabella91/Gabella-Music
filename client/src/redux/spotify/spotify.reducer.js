import SpotifyActionTypes from './spotify.types';

const INITIAL_STATE = {
  isConnected: false,
  lastTokenRefresh: null,
  userInfo: {},
  topArtistsLongTerm: [],
  topArtistsMediumTerm: [],
  topArtistsShortTerm: [],
  topTracksLongTerm: [],
  topTracksMediumTerm: [],
  topTracksShortTerm: [],
  error: null,
  isLoading: false,
};

const SpotifyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SpotifyActionTypes.MARK_CONNECTED:
      return {
        ...state,
        isConnected: true,
        error: null,
        lastTokenRefresh: Date.parse(action.payload),
      };
    case SpotifyActionTypes.REFRESH_AUTH_TOKEN_SUCCESS:
      return {
        ...state,
        lastTokenRefresh: Date.parse(action.payload),
        error: null,
      };
    case SpotifyActionTypes.CONNECT_FAILURE:
      return {
        ...state,
        isConnected: false,
        error: action.payload,
      };
    case SpotifyActionTypes.FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        error: null,
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
    case SpotifyActionTypes.FETCH_TOP_TRACKS_LONG_TERM_SUCCESS:
      return {
        ...state,
        topTracksLongTerm: action.payload,
        error: null,
      };
    case SpotifyActionTypes.FETCH_TOP_TRACKS_MEDIUM_TERM_SUCCESS:
      return {
        ...state,
        topTracksMediumTerm: action.payload,
        error: null,
      };
    case SpotifyActionTypes.FETCH_TOP_TRACKS_SHORT_TERM_SUCCESS:
      return {
        ...state,
        topTracksShortTerm: action.payload,
        error: null,
      };
    case SpotifyActionTypes.DISCONNECT_SUCCESS:
      return {
        ...state,
        isConnected: false,
        error: null,
      };
    case SpotifyActionTypes.FETCH_USER_INFO_FAILURE:
    case SpotifyActionTypes.FETCH_TOP_ARTISTS_FAILURE:
    case SpotifyActionTypes.FETCH_TOP_TRACKS_FAILURE:
    case SpotifyActionTypes.REFRESH_AUTH_TOKEN_FAILURE:
    case SpotifyActionTypes.DISCONNECT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default SpotifyReducer;
