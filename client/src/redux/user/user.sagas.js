import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
  logInSuccess,
  logInFailure,
  logOutSuccess,
  logOutFailure,
  signUpSuccess,
  signUpFailure,
} from './user.actions';

export function* logIn({ payload: { email, password } }) {
  try {
  } catch (err) {
    yield put(logInFailure(err));
  }
}
