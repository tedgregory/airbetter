import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;
    if (!value) {
      return null;
    }
    const isValid = new Date(value).getTime() >= Date.now();

    return isValid ? null : { date_past: true };
  };
}
