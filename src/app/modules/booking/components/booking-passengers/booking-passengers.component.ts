import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { passengersFeature } from 'src/app/redux/passengers/passengers.reducer';
import {
  BookingPassenger,
  PassengersState,
} from 'src/app/redux/passengers/passengers.state';

@Component({
  selector: 'app-booking-passengers',
  templateUrl: './booking-passengers.component.html',
})
export class BookingPassengersComponent implements OnInit {
  @Output() completed = new EventEmitter<string>();

  passengersStateData$ = this.store.select(
    passengersFeature.selectPassengersState
  );

  passengersCollectedInfo: Omit<PassengersState, 'contactDetails'> = {
    adults: [],
    children: [],
    infants: [],
  };
  contactCollectedInfo: Partial<Pick<PassengersState, 'contactDetails'>> = {
    contactDetails: undefined,
  };

  constructor(private store: Store) {}

  ngOnInit(): void {
    // TODO - THIS WON'T WORK! MAke another stream line
    this.passengersStateData$.subscribe((data) => {
      if (
        data.adults?.length !== this.passengersCollectedInfo.adults?.length ||
        data.children?.length !==
          this.passengersCollectedInfo.children?.length ||
        data.infants?.length !== this.passengersCollectedInfo.infants?.length
      ) {
        return;
      }
    });
  }

  onPassengerFormAccepted(
    type: keyof Omit<PassengersState, 'contactDetails'>,
    data: BookingPassenger | null
  ) {
    if (!data) return;
    this.passengersCollectedInfo[type]?.push(data);
  }

  setPassengersCompleted() {
    this.completed.emit('passengers');
  }
}
