import { createReducer, on } from '@ngrx/store';
import { loadMyActivitiesSuccess } from './myactivities.actions';
import { initialState } from './myactivities.state';

const _myActivitiesReducer = createReducer(
  initialState,
  on(loadMyActivitiesSuccess, (state, action) => {
    return {
      ...state,
      myActivities: action.myActivities,
    };
  })
);
export function myActivitiesReducer(state: any, action: any) {
  return _myActivitiesReducer(state, action);
}
