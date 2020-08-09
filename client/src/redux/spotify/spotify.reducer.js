import SpotifyActionTypes from './spotify.types';

const INITIAL_STATE = {
  isConnected: false,
  error: null,
};

const SpotifyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SpotifyActionTypes.MARK_CONNECTED:
      return {
        ...state,
        isConnected: true,
        error: null,
      };
    case SpotifyActionTypes.CONNECT_FAILURE:
      return {
        ...state,
        isConnected: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default SpotifyReducer;
