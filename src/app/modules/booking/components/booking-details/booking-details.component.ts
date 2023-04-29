import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiResponse } from '../../models/booking.interface';

type PropsType = { isReturn: boolean; isConfirmed: boolean };

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
})
export class BookingDetailsComponent {
  @Input()
  currentFlight: ApiResponse | null = null;
  @Input()
  props: PropsType = { isConfirmed: false, isReturn: false };
  @Output()
  confirmation = new EventEmitter<boolean>();

  confirmVariant(value: boolean) {
    this.confirmation.emit(value);
  }
}
