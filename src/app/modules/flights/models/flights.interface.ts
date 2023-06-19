export interface LocationOption {
  key: string;
  name: string;
  city: string;
  gmt: string;
  country: string;
}

// export interface FlightDto {
//   readonly id: string;
//   readonly flyFrom: string;
//   readonly flyTo: string;
//   readonly cityCodeFrom: string;
//   readonly cityTo: string;
//   readonly cityCodeTo: string;
//   readonly countryFrom: {
//     readonly code: string;
//     readonly name: string;
//   };
//   readonly countryTo: {
//     readonly code: string;
//     readonly name: string;
//   };
//   readonly price: number;
//   readonly local_arrival: string;
//   readonly utc_arrival: string;
//   readonly local_departure: string;
//   readonly utc_departure: string;
//   // "countryFrom": {
//   //   "code": "US",
//   //   "name": "United States"
//   // },
//   // "countryTo": {
//   //   "code": "US",
//   //   "name": "United States"
//   // },
//   // "price": 31,
//   // "local_arrival": "2023-05-09T21:06:00.000Z",
//   // "utc_arrival": "2023-05-10T01:06:00.000Z",
//   // "local_departure": "2023-05-09T17:59:00.000Z",
//   // "utc_departure": "2023-05-09T21:59:00.000Z"
// }

// export interface FlightEntity {
//   id: string;
//   flyFrom: string;
//   flyTo: string;
//   cityCodeFrom: string;
//   cityTo: string;
//   cityCodeTo: string;
//   countryFrom: {
//     code: string;
//     name: string;
//   };
//   countryTo: {
//     code: string;
//     name: string;
//   };
//   price: number;
//   local_arrival: string;
//   utc_arrival: string;
//   local_departure: string;
//   utc_departure: string;
// }

// // eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface Flight extends FlightEntity {}

// export enum FlightField {
//   Id = 'id',
//   FlyFrom = 'flyFrom',
//   FlyTo = 'flyTo',
//   CityCodeFrom = 'cityCodeFrom',
//   CityTo = 'cityTo',
//   CityCodeTo = 'cityCodeTo',
//   CountryFrom = 'countryFrom',
//   CountryTo = 'countryTo',
//   Price = 'price',
//   LocalArrival = 'local_arrival',
//   UtcArrival = 'utc_arrival',
//   LocalDeparture = 'local_departure',
//   UtcDeparture = 'utc_departure',
// }

// export interface FlightDetails {
//   [FlightField.FlyFrom]: string;
//   [FlightField.FlyTo]: string;
//   [FlightField.CityCodeFrom]: string;
//   [FlightField.CityTo]: string;
//   [FlightField.CityCodeTo]: string;
//   [FlightField.CountryFrom]: string;
//   [FlightField.CountryTo]: string;
//   [FlightField.Price]: number;
//   [FlightField.LocalArrival]: string;
//   [FlightField.UtcArrival]: string;
//   [FlightField.LocalDeparture]: string;
//   [FlightField.UtcDeparture]: string;
// }

// export type TransformedFlightDetails = Partial<FlightDetails>;

// // export const FLIGHTS_IDS: Record<FlightField, string> = {
// // [FlightField.Id]: 'FlightId',
// // [FlightField.Name]: 'FlightName',
// // [FlightField.Rooms]: 'FlightRooms',
// // [FlightField.Person]: 'FlightPerson',
// // [FlightField.City]: 'FlightCity',
// // [FlightField.Address]: 'FlightAddress',
// // [FlightField.Created]: 'FlightCreated',
// // [FlightField.Updated]: 'FlightUpdated',
// // [FlightField.Lat]: 'FlightLat',
// // [FlightField.Lng]: 'FlightLng',
// // };

// // export interface ChangeFlight {
// //   id: string;
// // }

// // export interface ChangedFlight {
// //   id: string;
// // }
