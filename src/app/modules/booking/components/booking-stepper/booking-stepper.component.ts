import { Component, HostBinding } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

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

  isCompletedStepOne = false;

  isCompletedStepTwo = false;

  isCompletedStepThree = false;

  onCompletedStepOne(isCompleted: boolean) {
    this.isCompletedStepOne = isCompleted;
  }

  onCompletedStepTwo(isCompleted: boolean) {
    this.isCompletedStepTwo = isCompleted;
  }

  onCompletedStepThree(isCompleted: boolean) {
    this.isCompletedStepThree = isCompleted;
  }
}
