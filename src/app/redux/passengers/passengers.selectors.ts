import { createSelector } from '@ngrx/store';
import { passengersFeature } from '../passengers/passengers.reducer';

// this can be moved to extra reducers
export const selectPassengersForSearch = createSelector(
  passengersFeature.selectPassengersState,
  (passengers) => [
    passengers.adults?.length || 0,
    passengers.children?.length || 0,
    passengers.infants?.length || 0,
  ]
);
