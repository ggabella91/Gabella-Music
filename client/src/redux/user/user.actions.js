import UserActionTypes from './user.types';

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const signInStart = (email, password) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: { email, password },
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (name, email, password, passwordConfirm) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: { name, email, password, passwordConfirm },
});

export const signUpSuccess = (user) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: user,
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const changeInfoStart = (name, email) => ({
  type: UserActionTypes.CHANGE_INFO_START,
  payload: { name, email },
});

export const changeInfoSuccess = (message) => ({
  type: UserActionTypes.CHANGE_INFO_SUCCESS,
  payload: message,
});

export const changeInfoFailure = (error) => ({
  type: UserActionTypes.CHANGE_INFO_FAILURE,
  payload: error,
});

export const changePasswordStart = (
  passwordCurrent,
  password,
  passwordConfirm
) => ({
  type: UserActionTypes.CHANGE_PASSWORD_START,
  payload: { passwordCurrent, password, passwordConfirm },
});

export const changePasswordSuccess = (message) => ({
  type: UserActionTypes.CHANGE_PASSWORD_SUCCESS,
  payload: message,
});

export const changePasswordFailure = (error) => ({
  type: UserActionTypes.CHANGE_PASSWORD_FAILURE,
  payload: error,
});

export const forgotPasswordStart = (email) => ({
  type: UserActionTypes.FORGOT_PASSWORD_START,
  payload: email,
});

export const forgotPasswordSuccess = (message) => ({
  type: UserActionTypes.FORGOT_PASSWORD_SUCCESS,
  payload: message,
});

export const forgotPasswordFailure = (error) => ({
  type: UserActionTypes.FORGOT_PASSWORD_FAILURE,
  payload: error,
});

export const resetPasswordStart = (password, passwordConfirm, token) => ({
  type: UserActionTypes.RESET_PASSWORD_START,
  payload: { password, passwordConfirm, token },
});

export const resetPasswordSuccess = (message) => ({
  type: UserActionTypes.RESET_PASSWORD_SUCCESS,
  payload: message,
});

export const resetPasswordFailure = (error) => ({
  type: UserActionTypes.RESET_PASSWORD_FAILURE,
  payload: error,
});

export const deleteAccountStart = () => ({
  type: UserActionTypes.DELETE_ACCOUNT_START,
});

export const deleteAccountSuccess = () => ({
  type: UserActionTypes.DELETE_ACCOUNT_SUCCESS,
});

export const deleteAccountFailure = () => ({
  type: UserActionTypes.DELETE_ACCOUNT_FAILURE,
});
