import { Component } from '@angular/core';
import { BookingService } from '../../services/booking.service';
// import { Observable } from 'rxjs';
// import { BookingVariant } from 'src/app/booking/models';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
})
export class BookingCardComponent {
  // bookingVariant$!: Observable<BookingVariant>;

  constructor(private readonly bookingService: BookingService) {}

  // ngOnInit() {
  // this.bookingVariant$ = this.bookingService.bookingVariant$;
  // }

  // onSelected(bookingVariant: BookingVariant) {}
}
