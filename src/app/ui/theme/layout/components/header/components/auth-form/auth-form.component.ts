import { Component, OnInit } from '@angular/core';
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
import {
  Citizenship,
  CoreService,
  Country,
} from 'src/app/core/services/core.service';
import { dateValidator } from 'src/app/core/validators/date-validator';
import { birthDateValidator } from 'src/app/core/validators/birth-date-validator';
import { passwordStrengthValidator } from '../validators/password-strength';
import {
  PrefilledData,
  SignInRequestBody,
  SignUpRequestBody,
} from 'src/app/modules/user/services/user-auth.service';
import { Store } from '@ngrx/store';
import { UserAuthActions } from 'src/app/redux/auth/auth.actions';
import { selectServerError } from 'src/app/redux/auth/auth.selectors';

enum SignInFormKeys {
  EMAIL = 'email',
  PASSWORD = 'password',
}

enum SignUpFormKeys {
  EMAIL = 'email',
  PASSWORD = 'password',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  DATE_OF_BIRTH = 'dateOfBirth',
  GENDER = 'gender',
  COUNTRY_CODE = 'countryCode',
  PHONE = 'phone',
  CITIZENSHIP = 'citizenship',
  POLICY = 'policy',
}

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
})
export class AuthFormComponent implements OnInit {
  signInFormKeys = SignInFormKeys;

  signUpFormKeys = SignUpFormKeys;

  signInForm = new FormGroup({
    [SignInFormKeys.EMAIL]: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    [SignInFormKeys.PASSWORD]: new FormControl('', [Validators.required]),
  });

  signUpForm = new FormGroup({
    [SignUpFormKeys.EMAIL]: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    [SignUpFormKeys.PASSWORD]: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      passwordStrengthValidator(),
    ]),
    [SignUpFormKeys.FIRST_NAME]: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern('^[a-zA-Z\\s]*$'),
    ]),
    [SignUpFormKeys.LAST_NAME]: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern('^[a-zA-Z\\s]*$'),
    ]),
    [SignUpFormKeys.DATE_OF_BIRTH]: new FormControl('', [
      dateValidator(),
      birthDateValidator(),
    ]),
    [SignUpFormKeys.GENDER]: new FormControl('', [Validators.required]),
    [SignUpFormKeys.COUNTRY_CODE]: new FormControl('', [
      Validators.required,
      (control: AbstractControl) => {
        if (!control.value) return null;

        if (!this.selectedCountry) {
          return { invalidCountryCode: true };
        }

        return null;
      },
    ]),
    [SignUpFormKeys.PHONE]: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]*$'),
    ]),
    [SignUpFormKeys.CITIZENSHIP]: new FormControl('', [
      (control: AbstractControl) => {
        if (!control.value) return null;

        if (!this.selectedCitizenship) {
          return { invalidCitizenship: true };
        }

        return null;
      },
    ]),
    [SignUpFormKeys.POLICY]: new FormControl('', [Validators.requiredTrue]),
  });

  minBirthDate = new Date('1900-01-01');

  maxBirthDate = new Date();

  isPasswordHidden = true;

  selectedCountry: Country | null = null;

  selectedCitizenship: Citizenship | null = null;

  filteredCountries$: Observable<Country[]> = of<Country[]>([]);

  filteredCitizenships$: Observable<Citizenship[]> = of<Citizenship[]>([]);

  authServerError$ = this.store.select(selectServerError);

  lastFormSubmitted: 'signIn' | 'signUp' | null = null;

  constructor(private coreService: CoreService, private store: Store) {}

  ngOnInit() {
    this.filteredCountries$ =
      this.signUpForm?.get([SignUpFormKeys.COUNTRY_CODE])?.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm) => {
          return this.coreService.getCountries(searchTerm);
        })
      ) || of<Country[]>([]);

    this.filteredCitizenships$ =
      this.signUpForm?.get([SignUpFormKeys.CITIZENSHIP])?.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm) => {
          return this.coreService.getCitizenships(searchTerm);
        })
      ) || of<Citizenship[]>([]);

    this.signInForm.valueChanges.subscribe(() => {
      this.lastFormSubmitted = null;
    });

    this.signUpForm.valueChanges.subscribe(() => {
      this.lastFormSubmitted = null;
    });
  }

  onPrefilledDataDeliver(data: PrefilledData, type: 'signIn' | 'signUp') {
    if (type === 'signIn') {
      this.signInForm.controls[SignInFormKeys.EMAIL].setValue(
        data.signIn.email
      );
      this.signInForm.controls[SignInFormKeys.PASSWORD].setValue(
        data.signIn.password
      );
    }

    if (type === 'signUp') {
      this.signUpForm.controls[SignUpFormKeys.EMAIL].setValue(
        data.signUp.email
      );
      this.signUpForm.controls[SignUpFormKeys.PASSWORD].setValue(
        data.signUp.password
      );
      this.signUpForm.controls[SignUpFormKeys.FIRST_NAME].setValue(
        data.signUp.firstName
      );
      this.signUpForm.controls[SignUpFormKeys.LAST_NAME].setValue(
        data.signUp.lastName
      );
      this.signUpForm.controls[SignUpFormKeys.DATE_OF_BIRTH].setValue(
        data.signUp.dateOfBirth
      );
      this.signUpForm.controls[SignUpFormKeys.GENDER].setValue(
        data.signUp.gender
      );
      this.signUpForm.controls[SignUpFormKeys.PHONE].setValue(
        data.signUp.phone
      );
    }
  }

  onCountrySelection(country: Country) {
    this.selectedCountry = country;
  }

  onCountryInput() {
    this.selectedCountry = null;
    this.signUpForm?.get(SignUpFormKeys.COUNTRY_CODE)?.updateValueAndValidity();
  }

  onCitizenshipSelection(citizenship: Citizenship) {
    this.selectedCitizenship = citizenship;
  }

  onCitizenshipInput() {
    this.selectedCitizenship = null;
    this.signUpForm?.get(SignUpFormKeys.CITIZENSHIP)?.updateValueAndValidity();
  }

  isSignInFormSubmitAttempt = false;

  isSignUpFormSubmitAttempt = false;

  isFieldValid(field: string, formGroup: FormGroup, isSubmitAttempt: boolean) {
    const isValid =
      (!formGroup.get(field)?.valid && formGroup.get(field)?.touched) ||
      (formGroup.get(field)?.untouched && isSubmitAttempt);

    return isValid;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSignInFormSubmit() {
    this.isSignInFormSubmitAttempt = true;
    this.validateAllFormFields(this.signInForm);

    if (this.signInForm.invalid) return;

    const email = this.signInForm.get([SignUpFormKeys.EMAIL])?.value || '';
    const password =
      this.signInForm.get([SignUpFormKeys.PASSWORD])?.value || '';

    const body: SignInRequestBody = {
      email,
      password,
    };

    this.store.dispatch(UserAuthActions.signIn(body));
    this.lastFormSubmitted = 'signIn';
  }

  onSignUpFormSubmit() {
    this.isSignUpFormSubmitAttempt = true;
    this.validateAllFormFields(this.signUpForm);

    if (this.signUpForm.invalid) return;

    const email = this.signUpForm.get([SignUpFormKeys.EMAIL])?.value || '';
    const password =
      this.signUpForm.get([SignUpFormKeys.PASSWORD])?.value || '';
    const firstName =
      this.signUpForm.get([SignUpFormKeys.FIRST_NAME])?.value || '';
    const lastName =
      this.signUpForm.get([SignUpFormKeys.LAST_NAME])?.value || '';
    const dateOfBirthValue =
      this.signUpForm.get([SignUpFormKeys.DATE_OF_BIRTH])?.value || '';
    const dateOfBirth =
      dateOfBirthValue instanceof Date
        ? dateOfBirthValue.toISOString()
        : dateOfBirthValue;
    const gender = this.signUpForm.get([SignUpFormKeys.GENDER])?.value || '';
    const countryCode = this.selectedCountry?.dialCode || '';
    const phone = this.signUpForm.get([SignUpFormKeys.PHONE])?.value || '';
    const citizenship =
      this.signUpForm.get([SignUpFormKeys.CITIZENSHIP])?.value || '';

    const body: SignUpRequestBody = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      countryCode,
      phone,
      citizenship,
    };

    this.store.dispatch(UserAuthActions.signUp(body));
    this.lastFormSubmitted = 'signUp';
  }
}
