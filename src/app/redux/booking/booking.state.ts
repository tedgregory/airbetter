export interface BookingState {
  isLoading: boolean;
  error: Error | null;
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

// some extra interfaces, to deal with

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

export type IATADescription = {
  name: string;
  code: string;
};
