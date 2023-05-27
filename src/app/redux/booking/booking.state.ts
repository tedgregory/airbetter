import { EStatus } from '../common/common.models';

export interface BookingState {
  status: EStatus;
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
  steps: { [key: string]: boolean };
}

// some extra interfaces, to deal with

export interface BookingFlightBase {
  flightDate: string;
  id: string | null;
}

export interface BookingFlightVariant extends BookingFlightBase {
  flyFrom: {
    country: string;
    city: string;
    airport: string;
    iata: string;
    gmtOffset: string;
  };
  flyTo: {
    country: string;
    city: string;
    airport: string;
    iata: string;
    gmtOffset: string;
  };
  time: {
    departure_utc: string;
    arrival_utc: string;
    durMinutes: number;
  };
  seats: {
    total: number;
    available: number;
  };
  flight_no: string;

  price: Record<ECurrencies, number> | null;
}

export enum ECurrencies {
  EUR = 'EUR',
  USD = 'USD',
  RUB = 'RUB',
  PLN = 'PLN',
}

export interface IConvertedResponse {
  forward: {
    chosen: BookingFlightVariant;
    options: BookingFlightVariant[];
  } | null;
  backward: {
    chosen: BookingFlightVariant;
    options: BookingFlightVariant[];
  } | null;
}
