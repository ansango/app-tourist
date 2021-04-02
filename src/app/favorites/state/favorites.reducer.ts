import { createReducer, on } from '@ngrx/store';
import { loadFavoritesSuccess } from './favorites.actions';
import { initialState } from './favorites.state';

const _favoritesReducer = createReducer(
  initialState,
  on(loadFavoritesSuccess, (state, action) => {
    return {
      ...state,
      favorites: action.activities,
    };
  })
);

export function favoritesReducer(state: any, action: any) {
  return _favoritesReducer(state, action);
}
