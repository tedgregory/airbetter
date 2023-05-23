import { createFeature, createReducer, on } from '@ngrx/store';
import { PassengersState } from './passengers.state';
import { PassengersActions } from './passengers.actions';

const defaultState: PassengersState = {
  adults: Array(2),
  children: null,
  infants: null,
  contactDetails: {
    countryCode: '',
    phone: '',
    email: '',
  },
};

export const passengersFeature = createFeature({
  name: 'passengers',
  reducer: createReducer<PassengersState>(
    defaultState,
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
