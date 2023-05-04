import {
  BookingPassenger,
  DateFormats,
  IBookingState,
} from './models/booking.state';

export interface AppState {
  booking: IBookingState;
  settings: {
    dateFromat: DateFormats;
    currency: string;
  };
  passengers: {
    adults: BookingPassenger[] | null;
    children: BookingPassenger[] | null;
    infants: BookingPassenger[] | null;
  };
  user: {
    name: string;
  };
  contactDetails: {
    countryCode: string;
    phone: string;
    email: string;
  };
}
