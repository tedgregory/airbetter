import { createAction } from '@ngrx/store';
import { FlightDetails } from 'src/app/flights/models';
import { payload } from '@app/core/store/utils';

export const setFlightDetails = createAction(
  '[Flights] Set Flights Details',
  payload<FlightDetails>()
);

export const clearFlightDetails = createAction(
  '[Flights] Clear Flights Details'
);
