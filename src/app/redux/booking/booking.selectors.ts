import { createSelector } from '@ngrx/store';
import { bookingFeature } from './booking.reducer';

export const selectBookingBasic = createSelector(
  bookingFeature.selectBookingState,
  (state) => state
);
