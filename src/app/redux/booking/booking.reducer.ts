import { createFeature, createReducer, on } from '@ngrx/store';
import { BookingState } from './booking.state';
import { BookingActions } from './booking.actions';
import { EStatus } from '../common/common.models';

const defaultState: BookingState = {
  status: EStatus.Default,
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
  steps: {
    flights: false,
    passengers: false,
    review: false,
  },
};

export const bookingFeature = createFeature({
  name: 'booking',
  reducer: createReducer<BookingState>(
    defaultState,
    on(BookingActions.getVariants, (state): BookingState => {
      return { ...state, status: EStatus.Loading };
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
          status: EStatus.Loaded,
          flyToData: {
            ...state.flyToData,
            chosenVariant: bookingData.forward?.chosen || null,
            variants: bookingData.forward?.options || null,
          },
          flyBackData: {
            ...state.flyToData,
            chosenVariant: bookingData.backward?.chosen || null,
            variants: bookingData.backward?.options || null,
          },
          error: null,
        };
      }
    ),
    on(BookingActions.getVariantsError, (state, { error }): BookingState => {
      return {
        ...state,
        status: EStatus.Error,
        error,
      };
    }),
    on(
      BookingActions.setStepCompleted,
      (state, { step, status }): BookingState => {
        return {
          ...state,
          steps: {
            ...state.steps,
            [step]: status,
          },
        };
      }
    ),
    on(BookingActions.setChosenForward, (state, { variant }): BookingState => {
      return {
        ...state,
        flyToData: {
          ...state.flyToData,
          chosenVariant: variant,
        },
      };
    }),
    on(BookingActions.setChosenBackward, (state, { variant }): BookingState => {
      return {
        ...state,
        flyBackData: {
          ...state.flyBackData,
          chosenVariant: variant,
        },
      };
    })
  ),
});
