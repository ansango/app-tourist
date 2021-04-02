import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { ActivitiesService } from 'src/app/services/activities.service';
import {
  addActivity,
  addActivitySuccess,
  deleteActivity,
  deleteActivitySuccess,
  loadActivities,
  loadActivitiesAdmin,
  loadActivitiesAdminSuccess,
  loadActivitiesSuccess,
  loadMyActivities,
  loadMyActivitiesSuccess,
  updateActivity,
  updateActivitySuccess,
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

  loadActivitiesAdmin$ = createEffect(() => {
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

  loadMyActivities$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadMyActivities),
        switchMap((action) => {
          return this.activitiesService.getMyActivities(action.idUser).pipe(
            map((myActivities) => {
              console.log(myActivities);

              //return loadMyActivitiesSuccess({ myActivities });
            })
          );
        })
      );
    },
    { dispatch: false }
  );

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

  updateActivity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateActivity),
      switchMap((action) => {
        return this.activitiesService.updateActivity(action.activity).pipe(
          map((data) => {
            return updateActivitySuccess({ activity: action.activity });
          })
        );
      })
    );
  });

  deleteActivity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteActivity),
      switchMap((action) => {
        return this.activitiesService.deleteActivity(action.id).pipe(
          map((data) => {
            return deleteActivitySuccess({ id: action.id });
          })
        );
      })
    );
  });
}
