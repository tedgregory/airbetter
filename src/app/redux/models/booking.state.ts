export interface IBookingBase {
  flyFrom: string;
  flyTo: string;
  dateLeave: string | null;
  dateReturn: string | null;
  currency: string;
  passengersCount: [number, number, number]; // adults/children/infants
  dateFormat: DateFormats; // TODO: move to user state
}

export interface IBookingState extends IBookingBase {
  loading: boolean;
  error: Error | null;
  // may diverse for each order, hence here
  // passengers: {
  //   adults: BookingPassenger[] | null;
  //   children: BookingPassenger[] | null;
  //   infants: BookingPassenger[] | null;
  // };
  flyToData: {
    chosenVariant: BookingFlightVariant | null; // what if it's a stepover flight?
    confirmed: boolean;
    variants: BookingFlightVariant[] | null;
  };
  flyBackData: {
    chosenVariant: BookingFlightVariant | null;
    confirmed: boolean;
    variants: BookingFlightVariant[] | null; // null
  };
}

export interface BookingFlightBase {
  flightDate: string;
  token: string | null;
}

export interface BookingFlightVariant extends BookingFlightBase {
  flyFrom: {
    country: IATADescription;
    city: IATADescription;
    airport: IATADescription;
  };
  flyTo: {
    country: IATADescription;
    city: IATADescription;
    airport: IATADescription;
  };
  duration: number; //seconds
  time: {
    departure_local: string;
    departure_utc: string;
    arrival: string;
    arrival_utc: string;
  };
  seatsAvailable: number;
  airline: string;
  flight_no: number;
  bagsInfo: {
    price: number[];
    handLimit: {
      length: number;
      width: number;
      height: number;
      weight: number;
    };
    holdLimit: {
      length: number;
      width: number;
      height: number;
      weight: number;
    };
  };
  price: number; // total result in EUR?
  priceLocal: number; // total result in selected currency
  fare: {
    // cost per passenger
    adult: number;
    child: number;
    infant: number;
  };
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export enum DateFormats {
  DMY = 'DD/MM/YYYY',
  MDY = 'MM/DD/YYYY',
  YDM = 'YYYY/DD/MM',
  YMD = 'YYYY/MM/DD',
}

export type IATADescription = {
  name: string;
  code: string;
};

export type BookingPassenger = {
  name: {
    first: string;
    last: string;
  };
  gender: Gender;
  birthDate: string;
  specialCare: boolean;
};
