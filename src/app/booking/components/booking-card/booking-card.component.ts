import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { Observable } from 'rxjs';
// import { BookingVariant } from 'src/app/booking/models';
import { BookingService } from '@app/booking/service';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingCardComponent {
  // bookingVariant$!: Observable<BookingVariant>;

  constructor(private readonly bookingService: BookingService) {}

  // ngOnInit() {
  // this.bookingVariant$ = this.bookingService.bookingVariant$;
  // }

  // onSelected(bookingVariant: BookingVariant) {}
}
