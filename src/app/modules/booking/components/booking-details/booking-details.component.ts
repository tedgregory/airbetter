import { Component, Input } from '@angular/core';
import { IKiwiResponse } from '../../models/booking.interface';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
})
export class BookingDetailsComponent {
  @Input()
  currentFlight: IKiwiResponse | null = null;
  @Input()
  flip = false;
}
