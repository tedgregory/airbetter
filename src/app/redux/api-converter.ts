import moment from 'moment';
import { ApiResponse } from '../modules/booking/models/booking.interface';
import {
  BookingFlightBase,
  BookingFlightVariant,
} from './booking/booking.state';

export function convertApiResponseToVariant<
  A extends ApiResponse,
  T extends BookingFlightVariant
>(response: A, date: string) {
  if (!response.data.length) {
    return {
      flightDate: date,
      token: null,
    } as BookingFlightBase;
  }
  const variant = response.data[0];
  return {
    flightDate: date ? moment(date, 'DD/MM/YYYY').format() : Date.now(),
    token: variant.booking_token,
    flyFrom: {
      country: {
        name: variant.countryFrom.name,
        code: variant.countryFrom.code,
      },
      city: {
        name: variant.cityFrom,
        code: variant.cityCodeFrom,
      },
      airport: {
        name: variant.flyFrom,
        code: variant.flyFrom,
      },
    },
    flyTo: {
      country: {
        name: variant.countryTo.name,
        code: variant.countryTo.code,
      },
      city: {
        name: variant.cityTo,
        code: variant.cityCodeTo,
      },
      airport: {
        name: variant.flyTo,
        code: variant.flyTo,
      },
    },
    duration: variant.duration.total, //seconds
    time: {
      departure_local: variant.local_departure,
      departure_utc: variant.utc_departure,
      arrival: variant.local_arrival,
      arrival_utc: variant.utc_arrival,
    },
    seatsAvailable: variant.availability.seats,
    airline: variant.route[0].airline,
    flight_no: variant.route[0].flight_no,
    bagsInfo: {
      price: [variant.bags_price['1'] || 0, variant.bags_price['2'] || 0],
      handLimit: {
        length: variant.baglimit.hand_length,
        width: variant.baglimit.hand_width,
        height: variant.baglimit.hand_height,
        weight: variant.baglimit.hand_weight,
      },
      holdLimit: {
        length: variant.baglimit.hold_length,
        width: variant.baglimit.hold_width,
        height: variant.baglimit.hold_height,
        weight: variant.baglimit.hold_weight,
      },
    },
    price: variant.conversion['EUR'], // total result in EUR?
    priceLocal: variant.conversion[response.currency] || 0, // total result in selected currency
    fare: {
      // cost per passenger
      adult: variant.fare.adults,
      child: variant.fare.children,
      infant: variant.fare.infants,
    },
  } as T;
}
