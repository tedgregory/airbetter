import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { CoreService, Country } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-booking-passengers-contacts',
  templateUrl: './booking-passengers-contacts.component.html',
})
export class BookingPassengersContactsComponent implements OnInit {
  countryControl = new FormControl('');

  selectedCountry: Country | null = null;

  filteredCountries$: Observable<Country[]> = of<Country[]>([]);

  contactsForm = new FormGroup({
    countryCode: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]*$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private coreService: CoreService) {}

  ngOnInit() {
    this.filteredCountries$ = this.countryControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        return this.coreService.getCountries(searchTerm);
      })
    );
  }

  onCountrySelection(country: Country) {
    this.selectedCountry = country;
  }

  onCountryInput() {
    this.selectedCountry = null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  onSubmit() {
    this.validateAllFormFields(this.contactsForm);

    console.log(this.contactsForm);
    console.log(this.contactsForm.valid);
  }
}
