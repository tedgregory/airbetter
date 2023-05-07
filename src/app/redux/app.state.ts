import { BookingState } from './booking/booking.state';
import { PassengersState } from './passengers/passengers.state';
import { SearchState } from './search/search.state';
import { UserState } from './user/user.state';

export interface AppState {
  booking: BookingState;
  search: SearchState;
  passengers: PassengersState;
  user: UserState;
}
