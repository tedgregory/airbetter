import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_AUTH_FEATURE_NAME, UserAuthState } from './auth.state';

const selectFeature = createFeatureSelector<UserAuthState>(
  USER_AUTH_FEATURE_NAME
);

export const selectLoading = createSelector(
  selectFeature,
  (state) => state.loading
);

export const selectLoaded = createSelector(
  selectFeature,
  (state) => state.loaded
);

export const selectServerError = createSelector(
  selectFeature,
  (state) => state.serverError
);

export const selectAuthData = createSelector(
  selectFeature,
  (state) => state.authData
);

export const selectIsAuth = createSelector(
  selectFeature,
  (state) => state.isAuth
);
