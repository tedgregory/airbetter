import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingVariant } from '../../models/booking.interface';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
})
export class BookingListComponent {
  // implements OnInit
  bookingVariants$!: Observable<BookingVariant[]>;

  constructor(private readonly bookingService: BookingService) {}

  // ngOnInit() {
  // this.bookingVariants$ = this.bookingService.bookingVariants$;
  // }
}
