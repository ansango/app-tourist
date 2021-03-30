import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AUTH_STATE_NAME = 'auth';

export const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, (state) => {
  return state.user ? true : false;
});

export const getUserType = createSelector(getAuthState, (state) => {
  return state.userType;
});

export const getAdminId = createSelector(getAuthState, (state) => {
  return state.userType === 'company' ? state.user?.id : null;
});
