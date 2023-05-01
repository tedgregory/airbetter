import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-booking-summary-flight',
  templateUrl: './booking-summary-flight.component.html',
  styles: [],
})
export class BookingSummaryFlightComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() flightItem: any;
}
