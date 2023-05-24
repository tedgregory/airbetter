import { createFeature, createReducer, on } from '@ngrx/store';
import { PassengersState } from './passengers.state';
import { PassengersActions } from './passengers.actions';

const defaultState: PassengersState = {
  adults: null,
  children: null,
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
