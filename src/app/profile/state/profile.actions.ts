import { createAction, props } from '@ngrx/store';
import { Education } from 'src/app/models/education';

export const LOAD_EDUCATION = '[profile page] load education';
export const LOAD_EDUCATION_SUCCESS = '[profile page] load education success';

export const UPDATE_EDUCATION = '[profile page] update education';
export const UPDATE_EDUCATION_SUCCESS =
  '[profile page] update education success';

export const loadEducation = createAction(
  LOAD_EDUCATION,
  props<{ idUser: number | undefined }>()
);
export const loadEducationSuccess = createAction(
  LOAD_EDUCATION_SUCCESS,
  props<{ education: Education[] }>()
);

export const updateEducation = createAction(
  UPDATE_EDUCATION,
  props<{ education: Education }>()
);

export const updateEducationSuccess = createAction(
  UPDATE_EDUCATION_SUCCESS,
  props<{ education: Education }>()
);
