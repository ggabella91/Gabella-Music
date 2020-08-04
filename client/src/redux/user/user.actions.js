import UserActionTypes from './user.types';

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const logOutUser = () => ({
  type: UserActionTypes.LOG_OUT_USER,
});
