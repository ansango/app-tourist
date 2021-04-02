import { createReducer, on } from '@ngrx/store';
import {
  loadEducationSuccess,
  updateEducationSuccess,
} from './profile.actions';
import { initialState } from './profile.state';

const _profileReducer = createReducer(
  initialState,
  on(loadEducationSuccess, (state, action) => {
    return { ...state, education: action.education };
  }),
  on(updateEducationSuccess, (state, action) => {
    const updateEducation = state.education.map((education) => {
      return action.education.id === education.id
        ? action.education
        : education;
    });
    return { ...state, education: updateEducation };
  })
);

export function profileReducer(state: any, action: any) {
  return _profileReducer(state, action);
}
