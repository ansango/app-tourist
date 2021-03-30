import { Activity } from 'src/app/models/activity';

export interface ActivitiesState {
  activities: Activity[];
}

export const initialState: ActivitiesState = {
  activities: [],
};
