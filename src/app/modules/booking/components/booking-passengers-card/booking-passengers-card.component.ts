import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingPassenger } from 'src/app/redux/passengers/passengers.state';
import { Gender } from 'src/app/redux/common/common.models';
import { birthDateValidator } from '../../../../core/validators/birth-date-validator';
import {
  isFieldValid,
  validateAllFormFields,
} from 'src/app/core/helpers/validation.helper';
import { dateValidator } from 'src/app/core/validators/date-validator';
import { Observable } from 'rxjs';

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
export class BookingPassengersCardComponent implements OnInit {
  @Input()
  initialData: Partial<BookingPassenger> | null = null;
  @Input()
  order = 1;
  @Input()
  type = 'Adult';
  @Input()
  submissionTrigger: Observable<boolean> | null = null;
  @Output()
  formDataValid = new EventEmitter<BookingPassenger | null>();

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

  get isInfant() {
    return this.type === 'infant';
  }

  ngOnInit(): void {
    // this.passengerForm.valueChanges.subscribe((value) => {
    //   this.formDataValid.emit(
    //     this.passengerForm.valid ? this.mapPassengerData(value) : null
    //   );
    // });
    if (this.initialData) {
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

    this.submissionTrigger &&
      this.submissionTrigger.subscribe(() => {
        this.isFormSubmitAttempt = true;
        validateAllFormFields(this.passengerForm);
        if (!this.passengerForm.valid) {
          return;
        }
        this.isFormSubmitAttempt = false;
        this.formDataValid.emit(
          this.passengerForm.valid
            ? this.mapPassengerData(this.passengerForm.value)
            : null
        );
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
  isFormSubmitAttempt = false;

  isFieldValid = (control: string) =>
    isFieldValid(control, this.passengerForm, this.isFormSubmitAttempt);

  // onSubmit() {
  //   this.isFormSubmitAttempt = true;
  //   validateAllFormFields(this.passengerForm);

  //   console.log(this.passengerForm);
  //   console.log(this.passengerForm.valid);
  // }
}
