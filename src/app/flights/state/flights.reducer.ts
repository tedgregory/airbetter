import { createReducer } from '@ngrx/store';
import { FlightDetails } from 'src/app/flights/models';
// import * as FlightsActions from './flights.actions';

export const FLIGHTS_FEATURE_KEY = 'flights';

export interface FlightsState {
  flights: FlightDetails[];
}

export interface FlightsPartialState {
  readonly [FLIGHTS_FEATURE_KEY]: FlightsState;
}

export const flightsInitialState: FlightsState = {
  flights: [],
};

export const reducer = createReducer(
  flightsInitialState
  // on(FlightsActions.setFlightDetails, (state, { payload }) => ({
  //   ...state,
  //   flightsDetails: payload,
  // })),
  // on(FlightsActions.clearFlightDetails, (state) => ({
  //   ...state,
  //   flightsDetails: null,
  // }))
);
