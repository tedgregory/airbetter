import { createFeature, createReducer, on } from '@ngrx/store';
import { IBookingState, DateFormats } from '../models/booking.state';
import { BookingActions } from '../actions/booking.actions';

const defaultState: IBookingState = {
  loading: false,
  error: null,

  flyFrom: 'PRG',
  flyTo: 'DUS',
  dateLeave: '01-05-2023',
  dateReturn: null,

  currency: 'USD',

  dateFormat: DateFormats.DMY,

  // may diverse for each order, hence here
  // contactDetails: {
  //   countryCode: '',
  //   phone: '',
  //   email: '',
  // },
  passengersCount: [0, 0, 0],
  // passengers: {
  //   adults: null,
  //   children: null,
  //   infants: null,
  // },
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
  reducer: createReducer<IBookingState>(
    defaultState,
    on(BookingActions.getVariants, (state): IBookingState => {
      return { ...state, loading: true };
    }),
    on(
      BookingActions.getVariantsSuccess,
      (state, { variants }): IBookingState => {
        return {
          ...state,
          loading: false,
          flyToData: { ...state.flyToData, variants: variants },
        };
      }
    )
  ),
});
