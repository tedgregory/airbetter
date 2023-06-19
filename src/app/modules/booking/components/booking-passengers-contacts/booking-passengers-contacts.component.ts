import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { validateAllFormFields } from 'src/app/core/helpers/validation.helper';
import { CoreService, Country } from 'src/app/core/services/core.service';
import { ContactDetails } from 'src/app/redux/common/common.models';

enum ContactsFormKeys {
  COUNTRY_CODE = 'countryCode',
  PHONE = 'phone',
  EMAIL = 'email',
}

@Component({
  selector: 'app-booking-passengers-contacts',
  templateUrl: './booking-passengers-contacts.component.html',
})
export class BookingPassengersContactsComponent implements OnInit {
  @Input()
  submissionTrigger: Observable<boolean> | null = null;
  @Input()
  initialData: ContactDetails | null = null;
  @Output()
  formDataValid = new EventEmitter<ContactDetails | null>();

  contactsFormKeys = ContactsFormKeys;

  contactsForm = new FormGroup({
    [ContactsFormKeys.COUNTRY_CODE]: new FormControl('', [
      Validators.required,
      (control: AbstractControl) => {
        if (!control.value) return null;

        if (!this.selectedCountry) {
          return { invalidCountryCode: true };
        }

        return null;
      },
    ]),
    [ContactsFormKeys.PHONE]: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]*$'),
    ]),
    [ContactsFormKeys.EMAIL]: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
  });

  selectedCountry: Country | null = null;

  filteredCountries$: Observable<Country[]> = of<Country[]>([]);

  constructor(private coreService: CoreService) {}

  ngOnInit() {
    this.filteredCountries$ =
      this.contactsForm
        ?.get([ContactsFormKeys.COUNTRY_CODE])
        ?.valueChanges.pipe(
          startWith(''),
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((searchTerm) => {
            return this.coreService.getCountries(searchTerm);
          })
        ) || of<Country[]>([]);

    // this.contactsForm.valueChanges.subscribe((value) => {
    //   this.formDataValid.emit(
    //     this.contactsForm.valid ? this.mapFormData(value) : null
    //   );
    // });
    this.submissionTrigger &&
      this.submissionTrigger.subscribe(() => {
        validateAllFormFields(this.contactsForm);
        this.formDataValid.emit(
          this.contactsForm.valid
            ? this.mapFormData(this.contactsForm.value)
            : null
        );
      });
  }

  onCountrySelection(country: Country) {
    this.selectedCountry = country;
  }

  onCountryInput() {
    this.selectedCountry = null;
    this.contactsForm
      ?.get(ContactsFormKeys.COUNTRY_CODE)
      ?.updateValueAndValidity();
  }

  // onSubmit() {
  //   validateAllFormFields(this.contactsForm);

  //   console.log(this.contactsForm);
  //   console.log(this.contactsForm.valid);
  // }

  mapFormData(value: typeof this.contactsForm.value) {
    if (this.contactsForm.errors) return null;
    const contactData: ContactDetails = {
      countryCode: value[ContactsFormKeys.COUNTRY_CODE] || '+0',
      phone: value[ContactsFormKeys.PHONE] || '0',
      email: value[ContactsFormKeys.EMAIL] || 'william@microsoft.com',
    };
    return contactData;
  }
}
