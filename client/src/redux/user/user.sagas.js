import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
  setCurrentUser,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from './user.actions';

import axios from 'axios';

let origin;
if (process.env.NODE_ENV === 'development') {
  origin = 'http://localhost:8000/';
} else {
  origin = '/';
}

export function* signIn({ payload: { email, password } }) {
  try {
    const { data } = yield axios.post(`${origin}api/v1/users/login`, {
      email,
      password,
    });

    yield put(signInSuccess(data.data.user));
  } catch (err) {
    yield put(signInFailure(err));
  }
}

export function* isLoggedIn() {
  try {
    const userLoggedIn = yield axios.get(`${origin}api/v1/users/isLoggedIn`);

    if (!userLoggedIn.data.locals.user) return;
    yield put(setCurrentUser(userLoggedIn.data.locals.user));
  } catch (err) {
    yield put(signInFailure(err));
  }
}

export function* signOut() {
  try {
    yield axios.get(`${origin}api/v1/users/logout`);
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFailure(err));
  }
}

export function* signUp({
  payload: { name, email, password, passwordConfirm },
}) {
  try {
    const { data } = yield axios.post(`${origin}api/v1/users/signup`, {
      name,
      email,
      password,
      passwordConfirm,
    });

    yield put(signUpSuccess(data.data.user));
  } catch (err) {
    yield put(signUpFailure(err));
  }
}

export function* signInAfterSignUp({ payload: user }) {
  yield put(setCurrentUser(user));
}

export function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signIn);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isLoggedIn);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
