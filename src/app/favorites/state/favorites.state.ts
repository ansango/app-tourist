import { Activity } from 'src/app/models/activity';

export interface FavoritesState {
  favorites: Activity[] | null;
}

export const initialState: FavoritesState = {
  favorites: null,
};
