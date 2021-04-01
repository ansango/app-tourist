import { createReducer, on } from '@ngrx/store';
import {
  addActivitySuccess,
  deleteActivitySuccess,
  loadActivitiesAdminSuccess,
  loadActivitiesSuccess,
  loadMyActivitiesSuccess,
  updateActivitySuccess,
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
  }),
  on(loadMyActivitiesSuccess, (state, action) => {
    return {
      ...state,
      myActivities: action.myActivities,
    };
  }),
  on(addActivitySuccess, (state, action) => {
    let activity = { ...action.activity };
    return {
      ...state,
      activities: [...state.activities, activity],
      activitiesAdmin: [...state.activitiesAdmin, activity],
    };
  }),
  on(updateActivitySuccess, (state, action) => {
    const updateActivities = state.activitiesAdmin.map((activity) => {
      return action.activity.id === activity.id ? action.activity : activity;
    });

    return {
      ...state,
      activities: updateActivities,
      activitiesAdmin: updateActivities,
    };
  }),
  on(deleteActivitySuccess, (state, { id }) => {
    const activitiesAdmin = state.activitiesAdmin.filter((activity) => {
      return activity.id !== id;
    });
    const activities = state.activities.filter((activity) => {
      return activity.id !== id;
    });
    return {
      ...state,
      activities: activities,
      activitiesAdmin: activitiesAdmin,
    };
  })
);
export function activitiesReducer(state: any, action: any) {
  return _activitiesReducer(state, action);
}
