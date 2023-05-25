import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function birthDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    if (value === null) {
      return { invalidDate: true };
    }

    if (!value) {
      return null;
    }

    const dateValue = new Date(value).getTime();

    const isValid =
      dateValue <= Date.now() && dateValue >= new Date('1900-01-01').getTime();

    return isValid ? null : { invalidDate: true };
  };
}
