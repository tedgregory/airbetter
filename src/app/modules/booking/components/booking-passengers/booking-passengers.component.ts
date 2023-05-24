import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { PassengersActions } from 'src/app/redux/passengers/passengers.actions';
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

  passengersCollectedInfo$ = new BehaviorSubject<
    Omit<PassengersState, 'contactDetails' | 'error'>
  >({
    adults: [],
    children: [],
    infants: [],
  });

  contactCollectedInfo$ = new BehaviorSubject<Pick<
    PassengersState,
    'contactDetails'
  > | null>(null);

  constructor(private store: Store) {}

  ngOnInit(): void {
    // TODO - THIS WON'T WORK! MAke another stream line
    combineLatest([
      this.passengersCollectedInfo$,
      this.contactCollectedInfo$,
      this.passengersStateData$,
    ]).subscribe(([passengers, contacts, state]) => {
      if (
        state.adults?.length !== passengers.adults?.length ||
        state.children?.length !== passengers.children?.length ||
        state.infants?.length !== passengers.infants?.length ||
        !contacts
      ) {
        return;
      }
      this.setPassengersCompleted();
      this.store.dispatch(
        PassengersActions.setFullPassengersDetails({
          data: {
            ...passengers,
            ...contacts,
            error: null,
          },
        })
      );
    });
  }

  onPassengerFormAccepted(
    type: keyof Omit<PassengersState, 'contactDetails' | 'error'>,
    data: BookingPassenger | null
  ) {
    if (!data) return;
    const passInfo = this.passengersCollectedInfo$.value;
    const passTypeData = passInfo?.[type];
    this.passengersCollectedInfo$.next({
      ...passInfo,
      [type]: passTypeData && data ? [...passTypeData, data] : passTypeData,
    });
  }

  setPassengersCompleted() {
    this.completed.emit('passengers');
  }
}
