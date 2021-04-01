import { createReducer, on } from '@ngrx/store';
import { loginSuccess, autoLogout, signUpSuccess } from './auth.actions';
import { initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      profile: action.profile,
      profileType: action.profile.userType,
    };
  }),
  on(signUpSuccess, (state, action) => {
    return {
      ...state,
      profile: action.profile,
      profileType: action.profile.userType,
    };
  }),
  on(autoLogout, (state) => {
    return {
      ...state,
      profile: null,
      profileType: null,
    };
  })
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
