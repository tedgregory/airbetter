import { createSelector } from '@ngrx/store';
import { bookingFeature } from './booking.reducer';

export const selectIndexOfChosen = createSelector(
  bookingFeature.selectBookingState,
  (state) => state
);
