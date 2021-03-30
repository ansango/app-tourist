import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { ActivitiesService } from 'src/app/services/activities.service';
import {
  loadMyActivities,
  loadMyActivitiesSuccess,
} from './myactivities.actions';

@Injectable()
export class MyActivitiesEffects {
  constructor(
    private actions$: Actions,
    private activitiesService: ActivitiesService
  ) {}
  loadActivities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMyActivities),
      mergeMap((action) => {
        return this.activitiesService.getMyActivities().pipe(
          map((myActivities) => {
            return loadMyActivitiesSuccess({ myActivities });
          })
        );
      })
    );
  });
}
