import { Profile, UserType } from 'src/app/models/user';

export interface AuthState {
  profile: Profile | null;
  profileType: UserType | null;
}

export const initialState: AuthState = {
  profile: null,
  profileType: null,
};
