import { createAction, props } from '@ngrx/store';
import { MyActivity } from 'src/app/models/activity';

export const LOAD_MYACTIVITIES = '[post page] load my activities';
export const LOAD_MYACTIVITIES_SUCCESS =
  '[post page] load my activities success';

export const loadMyActivities = createAction(LOAD_MYACTIVITIES);
export const loadMyActivitiesSuccess = createAction(
  LOAD_MYACTIVITIES_SUCCESS,
  props<{ myActivities: MyActivity[] }>()
);
