import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  signInOrOutError: null,
  signUpError: null,
  forgotOrResetConfirm: null,
  forgotOrResetError: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        signInOrOutError: null,
        signUpError: null,
        forgotOrResetError: null,
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        signInOrOutError: null,
        signUpError: null,
        forgotOrResetError: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        signInOrOutError: null,
        signUpError: null,
        forgotOrResetError: null,
      };
    case UserActionTypes.FORGOT_PASSWORD_SUCCESS:
    case UserActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotOrResetConfirm: action.payload,
        forgotOrResetError: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        signInOrOutError: action.payload,
      };
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        signUpError: action.payload,
      };
    case UserActionTypes.FORGOT_PASSWORD_FAILURE:
    case UserActionTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        forgotOrResetConfirm: null,
        forgotOrResetError: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
