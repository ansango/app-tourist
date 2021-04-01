import { createAction, props } from '@ngrx/store';
import { Activity } from 'src/app/models/activity';

export const LOAD_ACTIVITIES = '[activity page] load activities';
export const LOAD_ACTIVITIES_SUCCESS =
  '[activity page] load activities success';

export const LOAD_ACTIVITIES_ADMIN = '[activity page] load activities admin';
export const LOAD_ACTIVITIES_ADMIN_SUCCESS =
  '[activity page] load activities admin success';

export const ADD_ACTIVITY = '[activity page] add activity';
export const ADD_ACTIVITY_SUCCESS = '[activity page] add activity success';

export const loadActivities = createAction(LOAD_ACTIVITIES);
export const loadActivitiesSuccess = createAction(
  LOAD_ACTIVITIES_SUCCESS,
  props<{ activities: Activity[] }>()
);

export const loadActivitiesAdmin = createAction(
  LOAD_ACTIVITIES_ADMIN,
  props<{ idUser: number | undefined }>()
);
export const loadActivitiesAdminSuccess = createAction(
  LOAD_ACTIVITIES_ADMIN_SUCCESS,
  props<{ activitiesAdmin: Activity[] }>()
);

export const addActivity = createAction(
  ADD_ACTIVITY,
  props<{ activity: Activity }>()
);
export const addActivitySuccess = createAction(
  ADD_ACTIVITY_SUCCESS,
  props<{ activity: Activity }>()
);
