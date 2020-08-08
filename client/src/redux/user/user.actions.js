import UserActionTypes from './user.types';
import { useReducer } from 'react';

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const logOutUser = () => ({
  type: UserActionTypes.LOG_OUT_USER,
});

export const logInStart = (emailAndPassword) => ({
  type: UserActionTypes.LOG_IN_START,
  payload: emailAndPassword,
});

export const logInSuccess = (user) => ({
  type: UserActionTypes.LOG_IN_SUCCESS,
  payload: user,
});

export const logInFailure = (error) => ({
  type: UserActionTypes.LOG_IN_FAILURE,
  payload: error,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const logOutStart = () => ({
  type: UserActionTypes.LOG_OUT_START,
});

export const logOutSuccess = () => ({
  type: UserActionTypes.LOG_OUT_SUCCESS,
});

export const logOutFailure = (error) => ({
  type: UserActionTypes.LOG_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (userCredentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});
