import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { BookingDetails, BookingVariant } from 'src/app/booking/models';
import * as BookingActions from './booking.actions';
import { BookingState } from './booking.reducer';
import * as BookingSelectors from './booking.selectors';

@Injectable()
export class BookingFacade {
  bookingVariant$ = this.store.select(BookingSelectors.selectBookingVariant);

  bookingDetails$ = this.store.select(BookingSelectors.selectBookingDetails);

  constructor(private readonly store: Store<BookingState>) {}

  setBookingVariant(payload: BookingVariant) {
    this.dispatch(BookingActions.setBookingVariant({ payload }));
  }

  setBookingDetails(payload: BookingDetails) {
    this.dispatch(BookingActions.setBookingDetails({ payload }));
  }

  clearBookingVariant() {
    this.dispatch(BookingActions.clearBookingVariant());
  }

  clearBookingDetails() {
    this.dispatch(BookingActions.clearBookingDetails());
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
