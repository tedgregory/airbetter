import { createFeature, createReducer, on } from '@ngrx/store';
import { UserState } from './user.state';
import { UserActions } from './user.actions';

const defaultState: UserState = {
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
    })
  ),
});
