import { createFeature, createReducer, on } from '@ngrx/store';
import { PassengersState } from './passengers.state';
import { PassengersActions } from './passengers.actions';
import { Gender } from '../common/common.models';

const defaultState: PassengersState = {
  adults: [
    {
      name: {
        first: 'Harry',
        last: 'Potter',
      },
      birthDate: '1980-01-25T18:46:31.370Z',
      gender: Gender.Male,
      specialCare: false,
      seat: '30F',
      baggage: {
        checked: 1,
        hand: 2,
        hold: 1,
      },
    },
  ],
  children: [
    {
      name: {
        first: 'Lily',
        last: 'Potter',
      },
      birthDate: '2000-05-25T18:46:31.370Z',
      gender: Gender.Male,
      specialCare: false,
      baggage: {
        checked: 2,
        hand: 3,
        hold: 1,
      },
    },
  ],
  infants: null,
  contactDetails: {
    countryCode: '',
    phone: '',
    email: '',
  },
  error: null,
};

export const passengersFeature = createFeature({
  name: 'passengers',
  reducer: createReducer<PassengersState>(
    defaultState,
    on(PassengersActions.setError, (state, { error }): PassengersState => {
      return { ...state, error };
    }),
    on(
      PassengersActions.setPassengers,
      (state, { adults, children, infants }): PassengersState => {
        return { ...state, adults, children, infants };
      }
    ),
    on(
      PassengersActions.setContactDetails,
      (state, { contactDetails }): PassengersState => {
        return { ...state, contactDetails };
      }
    )
  ),
});
