import { Component, Input } from '@angular/core';
import { ApiResponse } from '../../models/booking.interface';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
})
export class BookingDetailsComponent {
  @Input()
  currentFlight: ApiResponse | null = null;
  @Input()
  isReturn = false;
}
