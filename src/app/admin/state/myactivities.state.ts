import { MyActivity } from 'src/app/models/activity';

export interface MyActivitiesState {
  myActivities: MyActivity[];
}

export const initialState: MyActivitiesState = {
  myActivities: [],
};
