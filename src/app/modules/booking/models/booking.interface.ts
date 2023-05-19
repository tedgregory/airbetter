// based on response

interface IFlightLocation {
  key: string;
  name: string;
  city: string;
  gmt: string;
  country: string;
}

interface IFlightPrice {
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
  form: IFlightLocation;
  to: IFlightLocation;
  takeoffDate: string;
  landingDate: string;
  price: IFlightPrice;
}

interface IApiResponse extends IFlight {
  otherFlights: Record<string, IFlight>;
}

export type ApiResponse = Array<IApiResponse>;
