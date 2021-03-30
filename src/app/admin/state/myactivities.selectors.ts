import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MyActivitiesState } from './myactivities.state';

export const MYACTIVITY_STATE_NAME = 'myActivities';
const getMyActivitiesState = createFeatureSelector<MyActivitiesState>(
  MYACTIVITY_STATE_NAME
);

export const getMyActivities = createSelector(getMyActivitiesState, (state) => {
  return state.myActivities;
});

export const getMyActivityById = createSelector(
  getMyActivitiesState,
  (state: any, props: any) => {
    return state.myActivities.find((activity: any) => activity.id === props.id);
  }
);
