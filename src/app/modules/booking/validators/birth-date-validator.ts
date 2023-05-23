import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function birthDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;
    if (!value) {
      return null;
    }
    const isValid =
      new Date(value).getTime() <= Date.now() &&
      new Date(value).getTime() >= new Date('1.1.1900').getTime();

    return isValid ? null : { invalidDate: true };
  };
}
