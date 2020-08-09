import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/user.sagas';
import { spotifySagas } from './spotify/spotify.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(spotifySagas)]);
}
