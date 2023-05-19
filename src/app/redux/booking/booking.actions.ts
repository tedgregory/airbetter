import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IConvertedResponse } from './booking.state';

export const BookingActions = createActionGroup({
  source: 'Booking',
  events: {
    'Get Variants': emptyProps(),
    'Get Variants Success': props<{
      bookingData: IConvertedResponse;
    }>(),
    'Get Variants Error': props<{ error: Error }>(),
    'Toggle FlyTo Confirmed': emptyProps(),
    'Toggle FlyBack Confirmed': emptyProps(),
    'Set Chosen Forward': props<{ variant: BookingFlightVariant }>(),
    'Set Chosen Backward': props<{ variant: BookingFlightVariant }>(),
  },
});
