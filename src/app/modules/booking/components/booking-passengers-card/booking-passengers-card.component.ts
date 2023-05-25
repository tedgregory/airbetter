import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { birthDateValidator } from '../../../../core/validators/birth-date-validator';
import {
  isFieldValid,
  validateAllFormFields,
} from 'src/app/core/helpers/validation.helper';
import { dateValidator } from 'src/app/core/validators/date-validator';

enum PassengerFormKeys {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  GENDER = 'gender',
  DATE_OF_BIRTH = 'dateOfBirth',
  BAGGAGE = 'baggage',
  CABIN = 'cabin',
  PERSONAL = 'personal',
  CHECKED = 'checked',
}

@Component({
  selector: 'app-booking-passengers-card',
  templateUrl: './booking-passengers-card.component.html',
})
export class BookingPassengersCardComponent {
  isInfant = false;

  passengerFormKeys = PassengerFormKeys;

  passengerForm = new FormGroup({
    [PassengerFormKeys.FIRST_NAME]: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern('^[a-zA-Z\\s]*$'),
    ]),
    [PassengerFormKeys.LAST_NAME]: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern('^[a-zA-Z\\s]*$'),
    ]),
    [PassengerFormKeys.GENDER]: new FormControl('', [Validators.required]),
    [PassengerFormKeys.DATE_OF_BIRTH]: new FormControl('', [
      dateValidator(),
      birthDateValidator(),
    ]),
    [PassengerFormKeys.BAGGAGE]: new FormGroup({
      [PassengerFormKeys.CABIN]: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(3),
      ]),
      [PassengerFormKeys.PERSONAL]: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(3),
      ]),
      [PassengerFormKeys.CHECKED]: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(3),
      ]),
    }),
  });

  minBirthDate = new Date('1900-01-01');

  maxBirthDate = new Date();

  isFormSubmitAttempt = false;

  isFieldValid = isFieldValid;

  onSubmit() {
    this.isFormSubmitAttempt = true;
    validateAllFormFields(this.passengerForm);

    console.log(this.passengerForm);
    console.log(this.passengerForm.valid);
  }
}
