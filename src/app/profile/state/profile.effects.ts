import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import {
  loadEducation,
  loadEducationSuccess,
  updateEducation,
  updateEducationSuccess,
} from './profile.actions';

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  loadEducation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadEducation),
      mergeMap((action) => {
        const userId = action.idUser;

        return this.authService.getEducation().pipe(
          map((data) => {
            const education = data.filter((certificate) => {
              return certificate.userId === userId;
            });

            return loadEducationSuccess({ education });
          })
        );
      })
    );
  });

  updateEducation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateEducation),
      switchMap((action) => {
        const education = action.education;
        return this.authService.updateEducation(education).pipe(
          map((data) => {
            return updateEducationSuccess({ education });
          })
        );
      })
    );
  });
}
