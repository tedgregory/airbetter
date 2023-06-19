import moment from 'moment';
import {
  ApiResponse,
  IFlight,
} from '../modules/booking/models/booking.interface';
import {
  BookingFlightVariant,
  IConvertedResponse,
} from './booking/booking.state';

export function convertApiResponseToVariant(
  response: ApiResponse
): IConvertedResponse {
  const result: IConvertedResponse = {
    forward: null,
    backward: null,
  };
  if (response[0]) {
    result.forward = {
      chosen: mapApiVariantToModel(response[0] as IFlight),
      options: [],
    };
    result.forward.options.push(result.forward.chosen);
    const altFlight = response[0].otherFlights;
    for (let i = 1; i <= 5; i++) {
      if (altFlight[`${i}`]) {
        result.forward.options.push(
          mapApiVariantToModel(altFlight[`${i}`] as IFlight)
        );
      }
      if (altFlight[`-${i}`]) {
        result.forward.options.unshift(
          mapApiVariantToModel(altFlight[`-${i}`] as IFlight)
        );
      }
    }
  }
  if (response[1]) {
    result.backward = {
      chosen: mapApiVariantToModel(response[1] as IFlight),
      options: [],
    };
    result.backward.options.push(result.backward.chosen);
    const altFlight = response[1].otherFlights;
    for (let i = 1; i <= 5; i++) {
      if (altFlight[`${i}`]) {
        result.backward.options.push(
          mapApiVariantToModel(altFlight[`${i}`] as IFlight)
        );
      }
      if (altFlight[`-${i}`]) {
        result.backward.options.unshift(
          mapApiVariantToModel(altFlight[`-${i}`] as IFlight)
        );
      }
    }
  }
  return result;
}

function mapApiVariantToModel(data: IFlight): BookingFlightVariant {
  return {
    flightDate: moment(data.takeoffDate || Date.now()).format(),
    id: generateToken(),
    flyFrom: {
      country: data.form.country,
      city: data.form.city,
      airport: data.form.name,
      gmtOffset: data.form.gmt,
      iata: data.form.key,
    },
    flyTo: {
      country: data.to.country,
      city: data.to.city,
      airport: data.to.name,
      gmtOffset: data.to.gmt,
      iata: data.to.key,
    },
    time: {
      departure_utc: data.takeoffDate,
      arrival_utc: data.landingDate,
      durMinutes: data.timeMins,
    },
    seats: {
      total: data.seats.total,
      available: data.seats.avaible,
    },
    flight_no: data.flightNumber,
    price: {
      EUR: data.price.eur,
      USD: data.price.usd,
      RUB: data.price.rub,
      PLN: data.price.pln,
    },
  };
}

function generateToken() {
  return Math.random().toString(36).slice(2);
}
