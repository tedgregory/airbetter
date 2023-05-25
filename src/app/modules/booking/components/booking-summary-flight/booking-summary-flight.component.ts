import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { passengersFeature } from 'src/app/redux/passengers/passengers.reducer';
import {
  BookingPassenger,
  PassengersState,
} from 'src/app/redux/passengers/passengers.state';

type ViewPassengerDataType = {
  name: string;
  baggage: string[];
  seat: string;
};

type ViewFlightDataType = {
  name: string;
  date: string;
  time: string;
};

@Component({
  selector: 'app-booking-summary-flight',
  templateUrl: './booking-summary-flight.component.html',
})
export class BookingSummaryFlightComponent implements OnInit {
  // @Input() flightItem: any | null = null;
  @Input() flightItem: ViewFlightDataType | null = null;

  passengers$ = this.store.select(passengersFeature.selectPassengersState);
  passengersDisplayData: ViewPassengerDataType[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.passengers$.subscribe((passData) => {
      this.mapPassengersToView(passData);
    });
  }

  filterEmptyPassengers(data: BookingPassenger[] | null) {
    if (!data) return [];
    const result = [...data].filter((item) => item);
    return result.length ? result : [];
  }

  mapPassengersToView(data: PassengersState) {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const maxRow = rows.length - 1;
    let defaultSeat = 20;
    let linearPassengersData: BookingPassenger[] | null = [];
    linearPassengersData.push(...this.filterEmptyPassengers(data.adults));
    linearPassengersData.push(...this.filterEmptyPassengers(data.children));
    linearPassengersData.push(
      ...this.filterEmptyPassengers(data.infants as BookingPassenger[])
    );
    linearPassengersData = this.filterEmptyPassengers(linearPassengersData);

    this.passengersDisplayData = linearPassengersData.map((passenger, i) => {
      defaultSeat = defaultSeat + Math.floor(i / maxRow);
      return {
        name: `${passenger.name.first} ${passenger.name.last}`,
        baggage: [
          `${passenger.baggage.checked} checked bag${
            passenger.baggage.checked % 10 !== 1 ? 's' : ''
          } (total 23 kg) included`,
          `${passenger.baggage.hand} cabin bag${
            passenger.baggage.hand % 10 !== 1 ? 's' : ''
          } + ${passenger.baggage.hold} personal item${
            passenger.baggage.hold % 10 !== 1 ? 's' : ''
          } (max. 8 kg) included`,
        ],
        seat: passenger.seat || `${defaultSeat}${rows[i % maxRow]}`,
      };
    });
  }
}
