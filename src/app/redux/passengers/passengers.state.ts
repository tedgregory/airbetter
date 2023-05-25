import { ContactDetails, Gender } from '../common/common.models';

export type BookingPassenger = {
  name: {
    first: string;
    last: string;
  };
  gender: Gender;
  birthDate: string;
  baggage: {
    hand: number;
    hold: number;
    checked: number;
  };
  specialCare: boolean;
  seat?: string;
};

export interface PassengersState {
  adults: BookingPassenger[] | null;
  children: BookingPassenger[] | null;
  infants:
    | (Omit<BookingPassenger, 'specialCare'> &
        Partial<Pick<BookingPassenger, 'specialCare'>>)[]
    | null;
  contactDetails: ContactDetails | null;
  error: Error | null;
}
