import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiResponse } from '../../models/booking.interface';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
})
export class BookingCardComponent {
  @Input()
  bookingVariant: ApiResponse | null = null;
  @Input()
  isActive = false;
  @Output()
  chooseFlight = new EventEmitter<string | null>();

  setActive() {
    this.chooseFlight.emit(this.bookingVariant?.search_id || null);
  }
}
