import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { setErrorMessage } from 'src/app/store/shared/shared.actions';
import {
  autoLogin,
  autoLogout,
  loginFail,
  loginStart,
  loginSuccess,
  signUpFail,
  signUpStart,
  signUpSuccess,
  updateProfileStart,
  updateProfileSuccess,
} from './auth.actions';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data[0]);
            const userType = user.userType;
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user, userType, redirect: true });
          }),
          catchError((errResp) => {
            const errorMessage = this.authService.getErrorMessage();
            this.store.dispatch(setErrorMessage({ message: errorMessage }));
            return of(loginFail());
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signUpSuccess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUpStart),
      exhaustMap((action) => {
        const user = action.user;
        return this.authService.signUp(user).pipe(
          map((data) => {
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.newFormatUser(data);
            const userType = user.userType;
            const userId = user.id;
            this.authService.setUserInLocalStorage(user);
            return signUpSuccess({
              user,
              userType,
              userId,
              redirect: true,
            });
          }),
          catchError((errResp) => {
            const errorMessage = this.authService.getErrorMessage();
            this.store.dispatch(setErrorMessage({ message: errorMessage }));
            return of(signUpFail());
          })
        );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage()!;
        if (user) {
          const userType = user.userType;
          return of(loginSuccess({ user, userType, redirect: false }));
        } else {
          return of(loginFail());
        }
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogout),
        map((action) => {
          this.authService.logout();
          this.router.navigate(['auth/login']);
        })
      );
    },
    { dispatch: false }
  );

  updateProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProfileStart),
      switchMap((action) => {
        const user = action.user;
        console.log(user);

        return this.authService.updateUser(user).pipe(
          map((profile) => {
            this.router.navigate(['/profile']);
            return updateProfileSuccess({ user });
          })
        );
      })
    );
  });
}
