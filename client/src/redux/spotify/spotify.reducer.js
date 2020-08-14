import SpotifyActionTypes from './spotify.types';

const INITIAL_STATE = {
  isConnected: false,
  lastTokenRefresh: null,
  topArtists: [],
  error: null,
};

const SpotifyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SpotifyActionTypes.MARK_CONNECTED:
      return {
        ...state,
        isConnected: true,
        error: null,
        lastTokenRefresh: action.payload,
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
    case SpotifyActionTypes.FETCH_TOP_ARTISTS_SUCCESS:
      return {
        ...state,
        topArtists: action.payload,
        error: null,
      };
    case SpotifyActionTypes.FETCH_TOP_ARTISTS_FAILURE:
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
