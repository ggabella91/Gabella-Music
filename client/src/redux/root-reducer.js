import { combineReducers } from 'redux';
//import { persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import spotifyReducer from './spotify/spotify.reducer';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['cart'],
// };

const rootReducer = combineReducers({
  user: userReducer,
  spotifyState: spotifyReducer,
});

export default rootReducer;
