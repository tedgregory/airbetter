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
        if (passengers && contacts && !this.hasErrors) {
          this.setPassengersCompleted();
        }
      })
    );
    this.submissionTrigger &&
      this.subscriptions.push(
        this.submissionTrigger.subscribe(() => {
          this.hasErrors = false;
          this.passengersCollectedInfo$.next({
            adults: null,
            children: null,
            infants: null,
          });
        })
      );
    this.subscriptions.push(
      this.passengersStateData$.subscribe((passState) => {
        const passValues = this.passengersCollectedInfo$.value;
        if (passState.adults?.length !== passValues.adults?.length)
          passValues.adults =
            passValues.adults?.slice(0, passState.adults?.length) || null;
        if (passState.children?.length !== passValues.children?.length)
          passValues.children =
            passValues.children?.slice(0, passState.children?.length) || null;
        if (passState.infants?.length !== passValues.infants?.length)
          passValues.infants =
            passValues.infants?.slice(0, passState.infants?.length) || null;
        passValues !== this.passengersCollectedInfo$.value &&
          this.passengersCollectedInfo$.next(passValues);
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
      this.hasErrors = true;
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
      this.hasErrors = true;
      return;
    }
    this.contactCollectedInfo$.next({ contactDetails: data });
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
