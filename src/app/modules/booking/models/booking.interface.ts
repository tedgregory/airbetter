// based on response

interface Location {
  key: string;
  name: string;
  city: string;
  gmt: string;
  country: string;
}

interface Price {
  eur: number;
  usd: number;
  rub: number;
  pln: number;
}

export interface IFlight {
  seats: {
    total: number;
    avaible: number;
  };
  flightNumber: string;
  timeMins: number;
  form: Location;
  to: Location;
  takeoffDate: string;
  landingDate: string;
  price: Price;
}

interface IResponse extends IFlight {
  otherFlights: Record<string, IFlight>;
}

export type ApiResponse = Array<IResponse>;
