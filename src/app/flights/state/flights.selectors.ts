import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FLIGHTS_FEATURE_KEY, FlightsState } from './flights.reducer';

export const selectFlightsState =
  createFeatureSelector<FlightsState>(FLIGHTS_FEATURE_KEY);

export const selectFlights = createSelector(
  selectFlightsState,
  (state) => state.flights
);
