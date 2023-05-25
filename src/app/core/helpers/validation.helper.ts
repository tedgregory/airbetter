import { FormControl, FormGroup } from '@angular/forms';

function isFieldValid(
  field: string,
  formGroup: FormGroup,
  isSubmitAttempt: boolean
) {
  const isValid =
    (!formGroup.get(field)?.valid && formGroup.get(field)?.touched) ||
    (formGroup.get(field)?.untouched && isSubmitAttempt);

  return isValid;
}

function validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach((field) => {
    const control = formGroup.get(field);

    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      validateAllFormFields(control);
    }
  });
}

export { isFieldValid, validateAllFormFields };
