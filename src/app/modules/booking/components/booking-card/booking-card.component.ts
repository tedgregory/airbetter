import { Component, Input } from '@angular/core';
import { BookingFlightVariant } from 'src/app/redux/booking/booking.state';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
})
export class BookingCardComponent {
  @Input()
  bookingVariant: BookingFlightVariant | null = null;
  @Input()
  currency: keyof BookingFlightVariant['price'] | null = null;
}
