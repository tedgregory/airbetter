import { createFeature, createReducer, on } from '@ngrx/store';
import { BookingState } from './booking.state';
import { BookingActions } from './booking.actions';

const defaultState: BookingState = {
  isLoading: false,
  error: null,
  flyToData: {
    chosenVariant: null, // what if it's a stepover flight?
    confirmed: false,
    variants: null,
  },
  flyBackData: {
    chosenVariant: null,
    confirmed: false,
    variants: null,
  },
};

export const bookingFeature = createFeature({
  name: 'booking',
  reducer: createReducer<BookingState>(
    defaultState,
    on(BookingActions.getVariants, (state): BookingState => {
      return { ...state, isLoading: true };
    }),
    on(BookingActions.toggleFlytoConfirmed, (state): BookingState => {
      return {
        ...state,
        flyToData: {
          ...state.flyToData,
          confirmed: !state.flyToData.confirmed,
        },
      };
    }),
    on(BookingActions.toggleFlybackConfirmed, (state): BookingState => {
      return {
        ...state,
        flyBackData: {
          ...state.flyBackData,
          confirmed: !state.flyBackData.confirmed,
        },
      };
    }),
    on(
      BookingActions.getVariantsSuccess,
      (state, { bookingData }): BookingState => {
        return {
          ...state,
          isLoading: false,
          flyToData: {
            ...state.flyToData,
            chosenVariant: bookingData.leave?.length
              ? bookingData.leave[2]
              : null,
            variants: bookingData.leave,
          },
          flyBackData: {
            ...state.flyToData,
            chosenVariant: bookingData.return?.length
              ? bookingData.return[2]
              : null,
            variants: bookingData.return,
          },
          error: null,
        };
      }
    ),
    on(BookingActions.getVariantsError, (state, { error }): BookingState => {
      return {
        ...state,
        isLoading: false,
        error,
      };
    })
  ),
});
