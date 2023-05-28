import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { selectIsAuth } from 'src/app/redux/auth/auth.selectors';
import { NavigationPath } from 'src/app/core/navigation/models/navigation.interface';

export interface SignInRequestBody {
  email: string;
  password: string;
}

export interface SignUpRequestBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  countryCode: string;
  phone: string;
  citizenship: string;
}

export interface PrefilledData {
  signIn: SignInRequestBody;
  signUp: SignUpRequestBody;
}

export interface UserAuthToken {
  token: string;
}

export interface UserAuthData {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  countryCode: string;
  phone: string;
  citizenship: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  public readonly TOKEN_KEY = 'AIRBETTER_AUTH_TOKEN';

  isAuth$ = this.store.select(selectIsAuth);

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store
  ) {}

  signUp(body: SignUpRequestBody) {
    return this.httpClient
      .post<UserAuthToken>(
        'https://api.air-ways.online/auth/registration',
        body
      )
      .pipe(
        tap((tokenObj) => {
          localStorage.setItem(this.TOKEN_KEY, tokenObj.token);
        }),
        switchMap(() => {
          return this.checkAuth();
        }),
        catchError((error) => {
          if (error.status === 400) {
            return throwError(() => new Error('User already exists'));
          } else {
            return throwError(() => new Error('An error occured'));
          }
        })
      );
  }

  signIn(body: SignInRequestBody) {
    return this.httpClient
      .post<UserAuthToken>('https://api.air-ways.online/auth/login', body)
      .pipe(
        tap((tokenObj) => {
          localStorage.setItem(this.TOKEN_KEY, tokenObj.token);
        }),
        switchMap(() => {
          return this.checkAuth();
        }),
        catchError((error) => {
          if (error.status === 404 || error.status === 403) {
            return throwError(() => new Error('Wrong credentials'));
          } else {
            return throwError(() => new Error('An error occured'));
          }
        })
      );
  }

  checkAuth() {
    const localToken = localStorage.getItem(this.TOKEN_KEY);

    if (!localToken)
      return throwError(() => new Error('User is not authorized'));

    return this.httpClient
      .get<UserAuthData>('https://api.air-ways.online/auth/me', {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
      })
      .pipe(
        catchError((error) => {
          if (error.status === 403) {
            return throwError(() => new Error('User is not authorized'));
          } else {
            return throwError(() => new Error('An error occured'));
          }
        })
      );
  }

  signOut() {
    localStorage.removeItem(this.TOKEN_KEY);

    const route = this.router.url.split('/')[1];

    if (route === NavigationPath.Cart || route === NavigationPath.UserAccount) {
      this.router.navigateByUrl(NavigationPath.Flights);
    }
  }
}
