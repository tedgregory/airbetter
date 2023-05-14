import { createFeature, createReducer, on } from '@ngrx/store';
import { UserState } from './user.state';
import { UserActions } from './user.actions';
import { EStatus } from '../common/common.models';

const defaultState: UserState = {
  status: EStatus.Default,
  error: null,
  email: '',
  name: {
    first: '',
    last: '',
  },
  phone: {
    code: '',
    number: '',
  },
  gender: null,
  country: '',
};

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer<UserState>(
    defaultState,
    on(UserActions.setEmail, (state, { email }): UserState => {
      return { ...state, email };
    }),
    on(UserActions.setName, (state, { name }): UserState => {
      return { ...state, name };
    }),
    on(UserActions.setPhone, (state, { phone }): UserState => {
      return { ...state, phone };
    }),
    on(UserActions.setGender, (state, { gender }): UserState => {
      return { ...state, gender };
    }),
    on(UserActions.setCountry, (state, { country }): UserState => {
      return { ...state, country };
    }),
    on(UserActions.setStatus, (state, { status }): UserState => {
      return { ...state, status };
    }),
    on(UserActions.setError, (state, { error }): UserState => {
      return { ...state, error, status: EStatus.Error };
    }),
    on(UserActions.authRequest, (state): UserState => {
      return { ...state, status: EStatus.Loading };
    }),
    on(UserActions.authSuccess, (state, { data }): UserState => {
      const { name, email, country, gender, phone } = data;
      return {
        ...state,
        status: EStatus.Loaded,
        name,
        email,
        country,
        gender,
        phone,
      };
    }),
    on(UserActions.authLogout, (): UserState => {
      return defaultState;
    })
  ),
});
