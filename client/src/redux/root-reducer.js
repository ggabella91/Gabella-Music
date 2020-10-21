import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import spotifyReducer from './spotify/spotify.reducer';

// Persist user and spotify portions of state
// by adding their reducers to the whitelist array
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: userReducer,
  spotifyState: spotifyReducer,
});

export default persistReducer(persistConfig, rootReducer);
