import { createSelector } from '@ngrx/store';
import { passengersFeature } from '../passengers/passengers.reducer';
import { PassengerType } from '../common/common.models';

// this can be moved to extra reducers
export const selectPassengersForSearch = createSelector(
  passengersFeature.selectPassengersState,
  (passengers) => {
    return {
      [PassengerType.Adult]: passengers?.adults?.length || 0,
      [PassengerType.Child]: passengers?.children?.length || 0,
      [PassengerType.Infant]: passengers?.infants?.length || 0,
    };
  }
);
