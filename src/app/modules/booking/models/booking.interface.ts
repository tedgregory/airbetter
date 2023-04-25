// export interface BookingVariant {
//   // flight: FlightEntity | null;
//   flight: null;
// }

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

// based on response

interface CountryFrom {
  code: string;
  name: string;
}

interface CountryTo {
  code: string;
  name: string;
}

interface Fare {
  adults: number;
  children: number;
  infants: number;
}

interface Bags_price {
  1?: number;
  2?: number;
}

interface Baglimit {
  hand_height: number;
  hand_length: number;
  hand_weight: number;
  hand_width: number;
  hold_dimensions_sum: number;
  hold_height: number;
  hold_length: number;
  hold_weight: number;
  hold_width: number;
  personal_item_height?: number;
  personal_item_length?: number;
  personal_item_weight?: number;
  personal_item_width?: number;
}

export type BookingVariant = {
  id: string;
  combination_id?: string;
  flyFrom: string;
  flyTo: string;
  cityFrom: string;
  cityCodeFrom: string;
  cityTo: string;
  cityCodeTo: string;
  airline: string;
  flight_no: number;
  operating_carrier: string;
  operating_flight_no: string;
  fare_basis: string;
  fare_category: string;
  fare_classes: string;
  fare_family: string;
  return: number;
  bags_recheck_required: boolean;
  vi_connection: boolean;
  guarantee: boolean;
  vehicle_type: string;
  local_arrival: string;
  utc_arrival: string;
  local_departure: string;
  utc_departure: string;
};

export type TravelData = {
  id: string;
  flyFrom: string;
  flyTo: string;
  cityFrom: string;
  cityCodeFrom: string;
  cityTo: string;
  cityCodeTo: string;
  countryFrom: CountryFrom;
  countryTo: CountryTo;
  price: number; // !!!
  fare: Fare;
  bags_price: Bags_price;
  baglimit: Baglimit;
  availability: {
    seats: number | null;
  };
  airlines: string[];
  route: BookingVariant[];
  local_arrival: string;
  utc_arrival: string;
  local_departure: string;
  utc_departure: string;
};

interface SearchParams {
  flyFrom_type?: string;
  to_type?: string;
  seats: {
    passengers: number;
    adults: number;
    children: number;
    infants: number;
  };
}

export type IKiwiResponse = {
  search_id: string;
  currency: string;
  data: TravelData[];
  search_params: SearchParams;
};
