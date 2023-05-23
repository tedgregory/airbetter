import { createSelector } from '@ngrx/store';
import { passengersFeature } from '../passengers/passengers.reducer';
import { EPassengerType } from '../common/common.models';

// this can be moved to extra reducers
export const selectPassengersForSearch = createSelector(
  passengersFeature.selectPassengersState,
  (passengers) => {
    return {
      [EPassengerType.Adult]: passengers?.adults?.length || 0,
      [EPassengerType.Child]: passengers?.children?.length || 0,
      [EPassengerType.Infant]: passengers?.infants?.length || 0,
    };
  }
);
