import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBookingBase, IBookingState } from '../models/booking.state';

const selectBookingFeature =
  createFeatureSelector<IBookingState>('bookingState');

export const selectBookingBasic = createSelector(
  selectBookingFeature,
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

// export const selectCustomVideos = createSelector(
//   selectVideosFeature,
//   (state) => state.customVideos
// );
// export const selectIsLoading = createSelector(
//   selectVideosFeature,
//   (state) => state.isLoading
// );
// export const selectSearch = createSelector(
//   selectVideosFeature,
//   (state) => state.search
// );
// export const selectErrors = createSelector(
//   selectVideosFeature,
//   (state) => state.errors
// );

// export const selectVideo = (id: string) =>
//   createSelector(
//     selectApiVideos,
//     (state) => state.find((item) => item.id === id) || null
//   );
