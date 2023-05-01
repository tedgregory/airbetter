import { createReducer, on } from '@ngrx/store';
import { IBookingState, DateFormats } from '../models/booking.state';
import { BookingActions } from '../actions/booking.actions';

const defaultState: IBookingState = {
  loading: false,

  flyFrom: 'PRG',
  flyTo: 'DUS',
  dateLeave: '01-05-2023',
  dateReturn: '10-05-2023',

  currency: 'USD',

  dateFormat: DateFormats.DMY,

  // may diverse for each order, hence here
  contactDetails: {
    countryCode: '',
    phone: '',
    email: '',
  },
  passengersCount: [],
  passengers: {
    adults: null,
    children: null,
    infants: null,
  },
  flyToData: {
    chosenVariant: null, // what if it's a stepover flight?
    confirmed: false,
    variants: [],
  },
  flyBackData: {
    chosenVariant: null,
    confirmed: false,
    variants: [],
  },
};

export const bookingReducer = createReducer<IBookingState>(
  defaultState,
  on(BookingActions.getVariants, (state): IBookingState => {
    return { ...state, loading: true };
  }),
  on(
    BookingActions.getVariantsSuccess,
    (state, { variants }): IBookingState => {
      return {
        ...state,
        flyToData: { ...state.flyToData, variants: variants },
      };
    }
  )
  // on(VideosApiActions.getOneVideo, (state): IVideosState => {
  //   return { ...state, isLoading: true };
  // }),
  // on(VideosActions.getVideosSuccess, (state, { items }): IVideosState => {
  //   return {
  //     ...state,
  //     videos: items,
  //     isLoading: false,
  //   };
  // }),
  // on(VideosActions.setSearch, (state, { q }): IVideosState => {
  //   return { ...state, search: q };
  // }),
  // on(VideosActions.getOneVideoSuccess, (state, { item }): IVideosState => {
  //   if (!state.videos.length)
  //     return {
  //       ...state,
  //       videos: [item],
  //       isLoading: false,
  //     };
  //   if (state.videos.find((vid) => vid.id === item.id))
  //     return { ...state, isLoading: false };
  //   return {
  //     ...state,
  //     videos: [...state.videos, item],
  //     isLoading: false,
  //   };
  // }),
  // on(VideosActions.setVideosError, (state, { error }): IVideosState => {
  //   return {
  //     ...state,
  //     errors: [...state.errors, error],
  //   };
  // }),

  // on(CustomVideosActions.addVideo, (state, { item }): IVideosState => {
  //   return {
  //     ...state,
  //     customVideos: [...state.customVideos, item],
  //   };
  // }),
  // on(ErrorsActions.addError, (state, { e }): IVideosState => {
  //   return {
  //     ...state,
  //     errors: [...state.errors, e],
  //     isLoading: false,
  //   };
  // }),
  // on(ErrorsActions.clearAll, (state): IVideosState => {
  //   return {
  //     ...state,
  //     errors: defaultState.errors,
  //   };
  // })
);
