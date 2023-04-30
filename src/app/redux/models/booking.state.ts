export type BookingStateType = {
  flyFrom: string;
  flyTo: string;
  dateLeave: string;
  dateReturn: string;

  currency: string;

  // may diverse for each order, hence here
  contactDetails: {
    country: string;
    phone: string;
    email: string;
  };
  passengers: {
    adults: BookingPassenger[] | null;
    children: BookingPassenger[] | null;
    infants: BookingPassenger[] | null;
  };
  flyToData: {
    chosenVariant: BookingFlightVariant | null; // what if it's a stepover flight?
    confirmed: boolean;
    variants: BookingFlightVariant[];
  };
  flyBackData: {
    chosenVariant: BookingFlightVariant | null;
    confirmed: boolean;
    variants: BookingFlightVariant[];
  };
};

export type BookingFlightVariant = {
  token: string;
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
};

export enum Gender {
  Male = 'Male',
  Female = 'Female',
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
