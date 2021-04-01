import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivitiesState } from './activities.state';

export const ACTIVITY_STATE_NAME = 'activities';
const getActivitiesState = createFeatureSelector<ActivitiesState>(
  ACTIVITY_STATE_NAME
);

export const getActivities = createSelector(getActivitiesState, (state) => {
  return state.activities;
});

export const getActivityById = createSelector(
  getActivitiesState,
  (state: any, props: any) => {
    console.log(state);

    return state.activities.find((activity: any) => activity.id === props.id);
  }
);

export const getActByAdmin = createSelector(getActivitiesState, (state) => {
  return state.activitiesAdmin;
});

export const getActAdminById = createSelector(
  getActivitiesState,
  (state: any, props: any) => {
    return state.activitiesAdmin.find(
      (activity: any) => activity.id === props.id
    );
  }
);
