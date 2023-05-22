import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { birthDateValidator } from '../../validators/birth-date-validator';

@Component({
  selector: 'app-booking-passengers-card',
  templateUrl: './booking-passengers-card.component.html',
})
export class BookingPassengersCardComponent {
  passengerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]{3,}'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]{3,}'),
    ]),
    gender: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [
      Validators.required,
      birthDateValidator(),
    ]),
    baggage: new FormGroup({
      cabinBaggage: new FormControl(0, [Validators.min(0), Validators.max(3)]),
      personalBaggage: new FormControl(0, [
        Validators.min(0),
        Validators.max(3),
      ]),
      checkedBaggage: new FormControl(0, [
        Validators.min(0),
        Validators.max(3),
      ]),
    }),
  });

  onSubmit() {
    console.log(this.passengerForm);
    console.log(this.passengerForm.valid);
  }
}
