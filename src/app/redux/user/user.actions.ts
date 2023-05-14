import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserState } from './user.state';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Set Email': props<{
      email: UserState['email'];
    }>(),
    'Set Name': props<{
      name: UserState['name'];
    }>(),
    'Set Phone': props<{
      phone: UserState['phone'];
    }>(),
    'Set Gender': props<{
      gender: UserState['gender'];
    }>(),
    'Set Country': props<{
      country: UserState['country'];
    }>(),
    'Set Status': props<{
      status: UserState['status'];
    }>(),
    'Set Error': props<{
      error: UserState['error'];
    }>(),
    'Auth Logout': emptyProps(),
    'Auth request': emptyProps(),
    'Auth success': props<{
      data: Pick<UserState, 'email' | 'name' | 'gender' | 'phone' | 'country'>;
    }>(),
  },
});
