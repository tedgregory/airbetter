import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription, combineLatest } from 'rxjs';
import { ContactDetails } from 'src/app/redux/common/common.models';
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
export class BookingPassengersComponent implements OnInit, OnDestroy {
  @Input()
  submissionTrigger: Observable<boolean> | null = null;
  @Output() completed = new EventEmitter<[string, boolean]>();

  passengersStateData$ = this.store.select(
    passengersFeature.selectPassengersState
  );

  passengersCollectedInfo$ = new BehaviorSubject<
    Omit<PassengersState, 'contactDetails' | 'error'>
  >({
    adults: null,
    children: null,
    infants: null,
  });

  passengerCounts = [0, 0, 0];

  contactCollectedInfo$ = new BehaviorSubject<Pick<
    PassengersState,
    'contactDetails'
  > | null>(null);

  hasErrors = false;

  subscriptions: Subscription[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([
        this.passengersCollectedInfo$,
        this.contactCollectedInfo$,
      ]).subscribe(([passengers, contacts]) => {
        if (passengers && contacts && !this.isCountError) {
          this.setPassengersCompleted();
        }
      })
    );
    this.submissionTrigger &&
      this.subscriptions.push(
        this.submissionTrigger.subscribe(() => {
          this.passengersCollectedInfo$.next({
            adults: null,
            children: null,
            infants: null,
          });
        })
      );
    this.subscriptions.push(
      this.passengersStateData$.subscribe((passState) => {
        this.passengerCounts = [
          passState.adults?.length || 0,
          passState.children?.length || 0,
          passState.infants?.length || 0,
        ];
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (sub) => sub instanceof Subscription && sub.unsubscribe()
    );
  }

  onPassengerFormAccepted(
    type: keyof Omit<PassengersState, 'contactDetails' | 'error'>,
    data: BookingPassenger | null
  ) {
    if (!data) {
      return;
    }
    const passInfo = this.passengersCollectedInfo$.value;
    const passTypeData = passInfo?.[type]?.filter(
      (item) =>
        item.birthDate !== data.birthDate && item.name.first !== data.name.first
    );
    const newData = {
      ...passInfo,
      [type]: passTypeData?.length ? [...passTypeData, data] : [data],
    };
    this.passengersCollectedInfo$.next(newData);
  }

  onContactDetailsAccepted(data: ContactDetails | null) {
    if (!data) {
      return;
    }
    this.contactCollectedInfo$.next({ contactDetails: data });
  }

  get isCountError() {
    const { value: collected } = this.passengersCollectedInfo$;
    const collectedCounts = [
      collected.adults?.length || 0,
      collected.children?.length || 0,
      collected.infants?.length || 0,
    ];
    return !!collectedCounts.filter((num, i) => num !== this.passengerCounts[i])
      .length;
  }

  setPassengersInvalid() {
    this.completed.emit(['passengers', false]);
  }
  setPassengersCompleted() {
    this.completed.emit(['passengers', true]);
    this.store.dispatch(
      PassengersActions.setFullPassengersDetails({
        data: {
          ...this.passengersCollectedInfo$.value,
          ...this.contactCollectedInfo$.value,
          error: null,
        } as PassengersState,
      })
    );
  }
}
