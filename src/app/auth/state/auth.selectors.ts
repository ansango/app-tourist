import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AUTH_STATE_NAME = 'auth';

export const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, (state) => {
  return state.profile ? true : false;
});

export const getProfile = createSelector(getAuthState, (state) => {
  return state.profile!;
});

export const getProfileId = createSelector(getAuthState, (state) => {
  return state.profile?.id;
});

export const getProfileType = createSelector(getAuthState, (state) => {
  return state.profileType;
});
