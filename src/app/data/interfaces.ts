export interface CountryFrom {
  code: string;
  name: string;
}

export interface CountryTo {
  code: string;
  name: string;
}

export interface Duration {
  departure: number;
  return: number;
  total: number;
}

export interface Conversion {
  eUR: number;
}

export interface Fare {
  adults: number;
  children: number;
  infants: number;
}

export interface Bags_price {
  1: number;
  2: number;
}

export interface Baglimit {
  hand_height: number;
  hand_length: number;
  hand_weight: number;
  hand_width: number;
  hold_dimensions_sum: number;
  hold_height: number;
  hold_length: number;
  hold_weight: number;
  hold_width: number;
  personal_item_height: number;
  personal_item_length: number;
  personal_item_weight: number;
  personal_item_width: number;
}

export interface Availability {
  seats: number;
}

export type RouteInfo = {
  id: string;
  combination_id: string;
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
  equipment?: string;
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
  nightsInDest?: number;
  quality: number;
  distance: number;
  duration: Duration;
  price: number; // !!!
  conversion: Conversion;
  fare: Fare;
  bags_price: Bags_price;
  baglimit: Baglimit;
  availability: Availability;
  airlines: string[];
  route: RouteInfo[];
  booking_token: string;
  deep_link: string;
  facilitated_booking_available: boolean;
  pnr_count: number;
  has_airport_change: boolean;
  technical_stops: number;
  throw_away_ticketing: boolean;
  hidden_city_ticketing: boolean;
  virtual_interlining: boolean;
  local_arrival: string;
  utc_arrival: string;
  local_departure: string;
  utc_departure: string;
};

export interface Passengers {
  passengers: number;
  adults: number;
  children: number;
  infants: number;
}

interface SearchParams {
  flyFrom_type: string;
  to_type: string;
  seats: Passengers;
}

export type IKiwiResponse = {
  search_id: string;
  currency: string;
  fx_rate: number;
  data: TravelData[];
  _results: number;
  search_params: SearchParams;
  all_stopover_airports: string[];
  sort_version: number;
};
