import { createSelector } from '@ngrx/store';
import { IBookingBase } from '../models/booking.state';
import { bookingFeature } from '../reducers/booking.reducer';

export const selectBookingBasic = createSelector(
  bookingFeature.selectBookingState,
  (state) => {
    const {
      flyTo,
      flyFrom,
      dateLeave,
      dateReturn = null,
      currency,
      passengersCount = [0],
      dateFormat,
    } = state;
    return {
      flyTo,
      flyFrom,
      dateLeave,
      dateReturn,
      currency,
      passengersCount,
      dateFormat,
    } as IBookingBase;
  }
);
export const selectIsReturnSelector = createSelector(
  bookingFeature.selectBookingState,
  (state) => {
    return state.dateReturn === undefined;
  }
);
