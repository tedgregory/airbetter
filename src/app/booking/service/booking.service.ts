import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BookingDetails, BookingVariant } from 'src/app/booking/models';
import { BookingFacade } from '@app/booking/state';

@Injectable()
export class BookingService {
  bookingVariant$: Observable<BookingVariant> =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.bookingFacade.bookingVariant$.pipe(filter<any>(Boolean));

  // bookingVariants$: Observable<BookingVariant> = of(1, 2, 3);

  constructor(
    // private readonly flightsFacade: FlightsFacade,
    private readonly bookingFacade: BookingFacade
  ) {}

  setBookingVariant(bookingVariant: BookingVariant) {
    this.bookingFacade.setBookingVariant(bookingVariant);
  }

  setBookingDetails(bookingDetails: BookingDetails) {
    this.bookingFacade.setBookingDetails(bookingDetails);
  }

  clearBookingVariant() {
    this.bookingFacade.clearBookingVariant();
  }

  clearBookingDetails() {
    this.bookingFacade.clearBookingDetails();
  }
}
