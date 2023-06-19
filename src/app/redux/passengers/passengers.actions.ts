import { createActionGroup, props } from '@ngrx/store';
import { PassengersState } from './passengers.state';
import { CountsOptions } from 'src/app/modules/flights/components/select-passengers/select-passengers.component';

export const PassengersActions = createActionGroup({
  source: 'Passengers',
  events: {
    'Set Passengers': props<{
      adults: PassengersState['adults'];
      children: PassengersState['children'];
      infants: PassengersState['infants'];
    }>(),
    'Set Contact Details': props<{
      contactDetails: PassengersState['contactDetails'];
    }>(),
    'Set Full Passengers Details': props<{
      data: PassengersState;
    }>(),
    'Set Error': props<{
      error: PassengersState['error'];
    }>(),
    'Update Quantities': props<{
      count: CountsOptions;
    }>(),
  },
});
