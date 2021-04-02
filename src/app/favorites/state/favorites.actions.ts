import { createAction, props } from '@ngrx/store';
import { Activity } from 'src/app/models/activity';

export const LOAD_FAVORITES = '[activity page] load favorites';
export const LOAD_FAVORITES_SUCCESS = '[activity page] load favorites success';
export const ADD_FAVORITE = '[activity page] add favorite';
export const ADD_FAVORITE_SUCCESS = '[activity page] add favorite success';

export const loadFavorites = createAction(LOAD_FAVORITES);
export const loadFavoritesSuccess = createAction(
  LOAD_FAVORITES_SUCCESS,
  props<{ activities: Activity[] }>()
);

export const addFavorite = createAction(
  ADD_FAVORITE,
  props<{ activity: Activity }>()
);

export const addFavoriteSuccess = createAction(ADD_FAVORITE_SUCCESS);
