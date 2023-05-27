import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import moment from 'moment';
import { Observable, combineLatest } from 'rxjs';
import { bookingFeature } from 'src/app/redux/booking/booking.reducer';
import { passengersFeature } from 'src/app/redux/passengers/passengers.reducer';
import { searchFeature } from 'src/app/redux/search/search.reducer';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
})
export class BookingSummaryComponent implements OnInit {
  @Input()
  submissionTrigger: Observable<boolean> | null = null;
  @Output() completed = new EventEmitter<[string, boolean]>();

  constructor(private store: Store) {}

  savedFlyTo$ = this.store.select(bookingFeature.selectFlyToData);
  savedFlyBack$ = this.store.select(bookingFeature.selectFlyBackData);
  savedPassengers$ = this.store.select(passengersFeature.selectPassengersState);
  savedSearchValues$ = this.store.select(searchFeature.selectSearchState);

  flightsList: {
    jet: string;
    name: string;
    date: string;
    time: string;
  }[] = [];

  passengersQuantities: number[] = [];

  ngOnInit(): void {
    combineLatest([this.savedFlyTo$, this.savedFlyBack$]).subscribe(
      ([flyTo, flyBack]) => {
        this.flightsList = [];
        if (flyTo && flyTo.chosenVariant) {
          this.flightsList.push({
            jet: flyTo.chosenVariant?.flight_no,
            name: `${flyTo.chosenVariant?.flyFrom.city} - ${flyTo.chosenVariant?.flyTo.city}`,
            date: this.formatFlightDate(flyTo.chosenVariant?.flightDate),
            time: this.combineTimeIntervalText(
              flyTo.chosenVariant?.time.departure_utc,
              flyTo.chosenVariant?.time.arrival_utc
            ),
          });
        }
        if (flyBack && flyBack.chosenVariant) {
          this.flightsList.push({
            jet: flyBack.chosenVariant?.flight_no,
            name: `${flyBack.chosenVariant?.flyFrom.city} - ${flyBack.chosenVariant?.flyTo.city}`,
            date: this.formatFlightDate(flyBack.chosenVariant?.flightDate),
            time: this.combineTimeIntervalText(
              flyBack.chosenVariant?.time.departure_utc,
              flyBack.chosenVariant?.time.arrival_utc
            ),
          });
        }
      }
    );
  }

  formatFlightDate(dateString: string) {
    return moment(dateString).format('dddd, DD MMMM, YYYY');
  }

  combineTimeIntervalText(
    startDate: string | undefined,
    endDate: string | undefined
  ) {
    if (!startDate || !endDate) {
      return 'Error time formatting';
    }
    const start = moment(startDate);
    const end = moment(endDate);
    return `${start.format('HH:mm')} — ${end.format('HH:mm')}`;
  }

  setCompleted() {
    this.completed.emit(['review', true]);
  }
}
