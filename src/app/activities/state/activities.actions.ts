import { createAction, props } from '@ngrx/store';
import { Activity } from 'src/app/models/activity';

export const LOAD_ACTIVITIES = '[post page] load activities';
export const LOAD_ACTIVITIES_SUCCESS = '[post page] load activities success';

export const LOAD_ACTIVITIES_ADMIN = '[post page] load activities admin';
export const LOAD_ACTIVITIES_ADMIN_SUCCESS =
  '[post page] load activities admin success';

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
