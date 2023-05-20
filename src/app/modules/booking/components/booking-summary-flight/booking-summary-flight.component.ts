import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-booking-summary-flight',
  templateUrl: './booking-summary-flight.component.html',
})
export class BookingSummaryFlightComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() flightItem: any;

  summaryPassengers = [
    {
      name: 'Harry Potter',
      included: [
        '1 checked bag (total 23 kg) included',
        '1 cabin bag + 1 personal item (max. 8 kg) included',
        'Seat 19E',
      ],
    },
    {
      name: 'LiLi Potter',
      included: [
        '1 checked bag (total 23 kg) included',
        '1 cabin bag + 1 personal item (max. 8 kg) included',
        'Seat 20E',
      ],
    },
    {
      name: 'James Potter',
      included: [
        '1 checked bag (total 23 kg) included',
        '1 cabin bag + 1 personal item (max. 8 kg) included',
      ],
    },
  ];
}
