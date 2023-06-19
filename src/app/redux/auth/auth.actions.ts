/* eslint-disable @ngrx/prefer-inline-action-props */
import { createAction, props } from '@ngrx/store';
import {
  SignInRequestBody,
  SignUpRequestBody,
  UserAuthData,
} from 'src/app/modules/user/services/user-auth.service';

const signIn = createAction('[User Auth] Sign In', props<SignInRequestBody>());

const signInSuccess = createAction(
  '[User Auth] Sign In Success',
  props<UserAuthData>()
);

const signInFailed = createAction(
  '[User Auth] Sign In Failed',
  props<{ serverError: string }>()
);

const signUp = createAction('[User Auth] Sign Up', props<SignUpRequestBody>());

const signUpSuccess = createAction(
  '[User Auth] Sign Up Success',
  props<UserAuthData>()
);

const signUpFailed = createAction(
  '[User Auth] Sign Up Failed',
  props<{ serverError: string }>()
);

const checkAuth = createAction('[User Auth] Check Auth');

const checkAuthSuccess = createAction(
  '[User Auth] Check Auth Success',
  props<UserAuthData>()
);

const checkAuthFailed = createAction(
  '[User Auth] Check Auth Failed',
  props<{ serverError: string }>()
);

const signOut = createAction('[User Auth] Sign Out');

const signOutSuccess = createAction('[User Auth] Sign Out Success');

export const UserAuthActions = {
  signIn,
  signInSuccess,
  signInFailed,
  signUp,
  signUpSuccess,
  signUpFailed,
  checkAuth,
  checkAuthSuccess,
  checkAuthFailed,
  signOut,
  signOutSuccess,
};
/* eslint-enable */
