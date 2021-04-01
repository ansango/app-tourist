import { createReducer, on } from '@ngrx/store';
import {
  loadActivitiesAdminSuccess,
  loadActivitiesSuccess,
} from './activities.actions';
import { initialState } from './activities.state';

const _activitiesReducer = createReducer(
  initialState,
  on(loadActivitiesSuccess, (state, action) => {
    return {
      ...state,
      activities: action.activities,
    };
  }),
  on(loadActivitiesAdminSuccess, (state, action) => {
    return {
      ...state,
      activitiesAdmin: action.activitiesAdmin,
    };
  })
);
export function activitiesReducer(state: any, action: any) {
  return _activitiesReducer(state, action);
}
