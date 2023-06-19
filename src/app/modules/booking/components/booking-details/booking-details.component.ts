import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookingFlightVariant } from 'src/app/redux/booking/booking.state';
import { ECurrencies } from 'src/app/redux/common/common.models';

type PropsType = {
  isReturn: boolean;
  isConfirmed: boolean;
  currency: ECurrencies | null;
};

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
})
export class BookingDetailsComponent {
  @Input()
  currentFlight: BookingFlightVariant | null = null;
  @Input()
  props: PropsType = {
    isConfirmed: false,
    isReturn: false,
    currency: null,
  };
  @Output()
  confirmation = new EventEmitter<boolean>();

  confirmVariant(value: boolean) {
    this.confirmation.emit(value);
  }
}
