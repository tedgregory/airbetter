import { Component, HostBinding } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Store } from '@ngrx/store';
import { bookingFeature } from 'src/app/redux/booking/booking.reducer';
import { BookingActions } from 'src/app/redux/booking/booking.actions';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-booking-stepper',
  templateUrl: './booking-stepper.component.html',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class BookingStepperComponent {
  @HostBinding('class') class = 'booking-stepper';

  bookingSteps$ = this.store.select(bookingFeature.selectSteps);
  submissionTrigger$ = new Subject<boolean>();

  constructor(private store: Store) {}

  onFormsSubmitAttempt() {
    this.submissionTrigger$.next(true);
  }

  onSetStepCompleted([step, status]: [string, boolean]) {
    this.store.dispatch(BookingActions.setStepCompleted({ step, status }));
  }
}
