import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { ActivitiesService } from 'src/app/services/activities.service';
import {
  addActivity,
  addActivitySuccess,
  loadActivities,
  loadActivitiesAdmin,
  loadActivitiesAdminSuccess,
  loadActivitiesSuccess,
} from './activities.actions';

@Injectable()
export class ActivitiesEffects {
  constructor(
    private actions$: Actions,
    private activitiesService: ActivitiesService
  ) {}
  loadActivities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadActivities),
      mergeMap((action) => {
        return this.activitiesService.getActivities().pipe(
          map((activities) => {
            return loadActivitiesSuccess({ activities });
          })
        );
      })
    );
  });

  loadMyActivities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadActivitiesAdmin),
      mergeMap((action) => {
        return this.activitiesService.getActivities().pipe(
          map((activities) => {
            const adminId = action.idUser;
            const activitiesAdmin = activities.filter((activity) => {
              return activity.adminId === adminId;
            });
            return loadActivitiesAdminSuccess({ activitiesAdmin });
          })
        );
      })
    );
  });

  addActivity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addActivity),
      mergeMap((action) => {
        return this.activitiesService.postActivity(action.activity).pipe(
          map((data) => {
            const activity = { ...action.activity, id: data.id };
            return addActivitySuccess({ activity });
          })
        );
      })
    );
  });
}
