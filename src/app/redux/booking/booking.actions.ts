import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BookingFlightVariant, IConvertedResponse } from './booking.state';

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
    'Set Step Completed': props<{ step: string; status: boolean }>(),
    'Set Chosen Forward': props<{ index: number }>(),
    'Set Chosen Backward': props<{ index: number }>(),
    // 'Set Chosen Forward': props<{ variant: BookingFlightVariant }>(),
    // 'Set Chosen Backward': props<{ variant: BookingFlightVariant }>(),
  },
});
