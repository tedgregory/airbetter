import {
  BookingDetails,
  BookingField,
  BookingVariant,
} from 'src/app/booking/models';

export const BOOKING_VARIANT_STUB: BookingVariant = {
  // id: 1,
  flight: null,
  //...
};

export const BOOKING_DETAILS_STUB: BookingDetails = {
  [BookingField.Period]: {
    [BookingField.DateFrom]: '2023-05-01',
    [BookingField.DateTo]: '2023-05-12',
  },
  [BookingField.Passengers]: 1,
};
