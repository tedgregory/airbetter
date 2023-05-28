import { createReducer, on } from '@ngrx/store';
import { UserAuthActions } from './auth.actions';
import { UserAuthData } from 'src/app/modules/user/services/user-auth.service';
import { UserAuthState } from './auth.state';

const initialState: UserAuthState = {
  loading: false,
  loaded: false,
  serverError: null,
  isAuth: false,
  authData: null,
};

export const userAuthReducer = createReducer<UserAuthState>(
  initialState,
  on(
    UserAuthActions.signIn,
    (state): UserAuthState => ({
      ...state,
      loading: true,
      loaded: false,
      serverError: null,
      isAuth: false,
      authData: null,
    })
  ),
  on(
    UserAuthActions.signInSuccess,
    (state, authData: UserAuthData): UserAuthState => ({
      ...state,
      loading: false,
      loaded: true,
      serverError: null,
      isAuth: true,
      authData,
    })
  ),
  on(
    UserAuthActions.signInFailed,
    (state, { serverError }): UserAuthState => ({
      ...state,
      loading: false,
      loaded: true,
      serverError,
      isAuth: false,
      authData: null,
    })
  ),
  on(
    UserAuthActions.signUp,
    (state): UserAuthState => ({
      ...state,
      loading: true,
      loaded: false,
      serverError: null,
      isAuth: false,
      authData: null,
    })
  ),
  on(
    UserAuthActions.signUpSuccess,
    (state, authData: UserAuthData): UserAuthState => ({
      ...state,
      loading: false,
      loaded: true,
      serverError: null,
      isAuth: true,
      authData,
    })
  ),
  on(
    UserAuthActions.signUpFailed,
    (state, { serverError }): UserAuthState => ({
      ...state,
      loading: false,
      loaded: true,
      serverError,
      isAuth: false,
      authData: null,
    })
  ),
  on(
    UserAuthActions.checkAuth,
    (state): UserAuthState => ({
      ...state,
      loading: true,
      loaded: false,
      isAuth: false,
      authData: null,
    })
  ),
  on(
    UserAuthActions.checkAuthSuccess,
    (state, authData: UserAuthData): UserAuthState => ({
      ...state,
      loading: false,
      loaded: true,
      serverError: null,
      isAuth: true,
      authData,
    })
  ),
  on(
    UserAuthActions.checkAuthFailed,
    (state, { serverError }): UserAuthState => ({
      ...state,
      loading: false,
      loaded: true,
      serverError,
      isAuth: false,
      authData: null,
    })
  ),
  on(
    UserAuthActions.signOut,
    (state): UserAuthState => ({
      ...state,
      loading: false,
      loaded: false,
      serverError: 'User is not authorized',
      isAuth: false,
      authData: null,
    })
  )
);
