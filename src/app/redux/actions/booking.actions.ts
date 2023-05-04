import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BookingFlightVariant } from '../models/booking.state';

export const BookingActions = createActionGroup({
  source: 'Booking',
  events: {
    'Get Variants': emptyProps(),
    'Get Variants Success': props<{ variants: BookingFlightVariant[] }>(),
    'Get Variants Error': props<{ error: Error }>(),
  },
});
