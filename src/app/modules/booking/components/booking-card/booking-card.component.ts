import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookingFlightVariant } from 'src/app/redux/booking/booking.state';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
})
export class BookingCardComponent {
  @Input()
  bookingVariant: BookingFlightVariant | null = null;
  @Input()
  isActive = false;
  @Output()
  chooseFlight = new EventEmitter<string | null>();

  setActive() {
    this.chooseFlight.emit(this.bookingVariant?.token || null);
  }
}
