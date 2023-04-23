export interface BookingVariant {
  // flight: FlightEntity | null;
  flight: null;
}

export enum BookingField {
  Period = 'period',
  DateFrom = 'from',
  DateTo = 'to',
  Passengers = 'passengers',
}

export interface BookingDetails {
  [BookingField.Period]: {
    [BookingField.DateFrom]: string;
    [BookingField.DateTo]: string;
  };
  [BookingField.Passengers]: number;
}

export interface BookingPrice {
  days: number;
  fee: number;
  total: number;
}
