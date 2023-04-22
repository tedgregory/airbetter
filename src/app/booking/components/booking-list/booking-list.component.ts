import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingVariant } from 'src/app/booking/models';
import { BookingService } from '@app/booking/service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingListComponent {
  // implements OnInit
  bookingVariants$!: Observable<BookingVariant[]>;

  constructor(private readonly bookingService: BookingService) {}

  // ngOnInit() {
  // this.bookingVariants$ = this.bookingService.bookingVariants$;
  // }
}
