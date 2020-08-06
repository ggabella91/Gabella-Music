import SpotifyActionTypes from './spotify.types';

const INITIAL_STATE = {
  isConnected: false,
};

const SpotifyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SpotifyActionTypes.MARK_CONNECTED:
      return {
        ...state,
        isConnected: true,
      };

    default:
      return state;
  }
};

export default SpotifyReducer;
