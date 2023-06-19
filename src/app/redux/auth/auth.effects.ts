import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserAuthActions } from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserAuthService } from 'src/app/modules/user/services/user-auth.service';

@Injectable()
export class AuthEffects {
  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAuthActions.signIn),
      switchMap(({ email, password }) =>
        this.userAuthService.signIn({ email, password }).pipe(
          map((signInSuccessData) => {
            return UserAuthActions.signInSuccess(signInSuccessData);
          }),
          catchError((error) => {
            return of(
              UserAuthActions.signInFailed({
                serverError: error.message,
              })
            );
          })
        )
      )
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAuthActions.signUp),
      switchMap(
        ({
          email,
          password,
          firstName,
          lastName,
          dateOfBirth,
          gender,
          countryCode,
          phone,
          citizenship,
        }) =>
          this.userAuthService
            .signUp({
              email,
              password,
              firstName,
              lastName,
              dateOfBirth,
              gender,
              countryCode,
              phone,
              citizenship,
            })
            .pipe(
              map((signUpSuccessData) => {
                return UserAuthActions.signUpSuccess(signUpSuccessData);
              }),
              catchError((error) =>
                of(
                  UserAuthActions.signUpFailed({
                    serverError: error.message,
                  })
                )
              )
            )
      )
    );
  });

  checkAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAuthActions.checkAuth),
      switchMap(() =>
        this.userAuthService.checkAuth().pipe(
          map((userAuthData) => {
            return UserAuthActions.checkAuthSuccess(userAuthData);
          }),
          catchError((error) =>
            of(
              UserAuthActions.checkAuthFailed({
                serverError: error.message,
              })
            )
          )
        )
      )
    );
  });

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAuthActions.signOut),
      tap(() => {
        return this.userAuthService.signOut();
      }),
      map(() => {
        return { type: 'NO_ACTION' };
      })
    );
  });

  constructor(
    private actions$: Actions,
    private userAuthService: UserAuthService
  ) {}
}
