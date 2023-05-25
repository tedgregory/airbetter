import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { birthDateValidator } from '../../validators/birth-date-validator';

import {
  isFieldValid,
  validateAllFormFields,
} from 'src/app/core/helpers/validation.helper';

@Component({
  selector: 'app-booking-passengers-card',
  templateUrl: './booking-passengers-card.component.html',
})
export class BookingPassengersCardComponent {
  isInfant = false;

  passengerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern('^[a-zA-Z\\s]*$'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern('^[a-zA-Z\\s]*$'),
    ]),
    gender: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [
      Validators.required,
      birthDateValidator(),
    ]),
    baggage: new FormGroup({
      cabin: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(3),
      ]),
      personal: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(3),
      ]),
      checked: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(3),
      ]),
    }),
  });

  minBirthDate = new Date('1.1.1900');
  maxBirthDate = new Date();

  isFormSubmitAttempt = false;

  isFieldValid = isFieldValid;

  // isFieldValid(field: string) {
  //   const isValid =
  //     (!this.passengerForm.get(field)?.valid &&
  //       this.passengerForm.get(field)?.touched) ||
  //     (this.passengerForm.get(field)?.untouched && this.isFormSubmitAttempt);

  //   return isValid;
  // }

  // validateAllFormFields(formGroup: FormGroup) {
  //   Object.keys(formGroup.controls).forEach((field) => {
  //     const control = formGroup.get(field);

  //     if (control instanceof FormControl) {
  //       control.markAsTouched({ onlySelf: true });
  //     } else if (control instanceof FormGroup) {
  //       this.validateAllFormFields(control);
  //     }
  //   });
  // }

  onSubmit() {
    this.isFormSubmitAttempt = true;
    validateAllFormFields(this.passengerForm);

    console.log(this.passengerForm);
    console.log(this.passengerForm.valid);
  }
}
