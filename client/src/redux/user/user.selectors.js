import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectUserSignInOrOutError = createSelector(
  [selectUser],
  (user) => user.signInOrOutError
);

export const selectUserSignUpError = createSelector(
  [selectUser],
  (user) => user.signUpError
);

export const selectChangeInfoConfirm = createSelector(
  [selectUser],
  (user) => user.changeInfoConfirm
);

export const selectChangeInfoError = createSelector(
  [selectUser],
  (user) => user.changeInfoError
);

export const selectChangePasswordConfirm = createSelector(
  [selectUser],
  (user) => user.changePasswordConfirm
);

export const selectChangePasswordError = createSelector(
  [selectUser],
  (user) => user.changePasswordError
);

export const selectForgotOrResetError = createSelector(
  [selectUser],
  (user) => user.forgotOrResetError
);

export const selectForgotOrResetConfirm = createSelector(
  [selectUser],
  (user) => user.forgotOrResetConfirm
);
