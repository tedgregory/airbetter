import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { birthDateValidator } from '../../validators/birth-date-validator';
import { BookingPassenger } from 'src/app/redux/passengers/passengers.state';
import { Gender } from 'src/app/redux/common/common.models';

@Component({
  selector: 'app-booking-passengers-card',
  templateUrl: './booking-passengers-card.component.html',
})
export class BookingPassengersCardComponent implements OnInit {
  @Input()
  initialData: Partial<BookingPassenger> | null = null;
  @Input()
  order = 1;
  @Input()
  type = 'Adult';
  @Output()
  formDataValid = new EventEmitter<BookingPassenger | null>();

  passengerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z\\s]*$'),
      Validators.max(30),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z\\s]*$'),
      Validators.max(30),
    ]),
    gender: new FormControl<Gender | null>(null, [Validators.required]),
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

  get isInfant() {
    return this.type === 'infant';
  }

  ngOnInit(): void {
    this.passengerForm.valueChanges.subscribe((value) => {
      this.formDataValid.emit(
        this.passengerForm.valid ? this.mapPassengerData(value) : null
      );
    });
    this.passengerForm.setValue({
      firstName: this.initialData?.name?.first || '',
      lastName: this.initialData?.name?.last || '',
      baggage: {
        cabin: this.initialData?.baggage?.hand || 0,
        personal: this.initialData?.baggage?.hold || 0,
        checked: this.initialData?.baggage?.hand || 0,
      },
      dateOfBirth: this.initialData?.birthDate || '',
      gender: this.initialData?.gender || null,
    });
  }

  mapPassengerData(value: typeof this.passengerForm.value) {
    if (this.passengerForm.errors) return null;
    const passengerData: BookingPassenger = {
      name: {
        first: value.firstName || 'No name',
        last: value.lastName || 'No last name',
      },
      birthDate: value.dateOfBirth || new Date().toISOString(),
      gender: value.gender as Gender,
      baggage: {
        hand: value.baggage?.cabin || 0,
        hold: value.baggage?.personal || 0,
        checked: value.baggage?.checked || 0,
      },
      specialCare: !this.isInfant,
    };
    return passengerData;
  }
}
