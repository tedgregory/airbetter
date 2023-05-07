import { ContactDetails, Gender } from '../common/common.models';

export type BookingPassenger = {
  name: {
    first: string;
    last: string;
  };
  gender: Gender;
  birthDate: string;
  specialCare: boolean;
};

export interface PassengersState {
  adults: BookingPassenger[] | null;
  children: BookingPassenger[] | null;
  infants:
    | (Omit<BookingPassenger, 'specialCare'> &
        Partial<Pick<BookingPassenger, 'specialCare'>>)[]
    | null;
  contactDetails: ContactDetails;
}
