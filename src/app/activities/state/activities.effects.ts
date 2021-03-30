import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { ActivitiesService } from 'src/app/services/activities.service';
import { loadActivities, loadActivitiesSuccess } from './activities.actions';

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
}
