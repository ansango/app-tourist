import { User, UserType } from 'src/app/models/user';

export interface AuthState {
  user: User | null;
  userType: UserType | null;
  adminId: number | null;
}

export const initialState: AuthState = {
  user: null,
  userType: null,
  adminId: null,
};
