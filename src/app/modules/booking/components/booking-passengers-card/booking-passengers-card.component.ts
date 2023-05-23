import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { birthDateValidator } from '../../validators/birth-date-validator';

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

  onSubmit() {
    console.log(this.passengerForm);
    console.log(this.passengerForm.valid);
  }
}
