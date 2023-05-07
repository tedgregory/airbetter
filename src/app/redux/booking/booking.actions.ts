import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BookingFlightVariant } from './booking.state';

export const BookingActions = createActionGroup({
  source: 'Booking',
  events: {
    'Get Variants': emptyProps(),
    'Get Variants Success': props<{
      bookingData: {
        leave: BookingFlightVariant[] | null;
        return: BookingFlightVariant[] | null;
      };
    }>(),
    'Get Variants Error': props<{ error: Error }>(),
    'Toggle FlyTo Confirmed': emptyProps(),
    'Toggle FlyBack Confirmed': emptyProps(),
  },
});
