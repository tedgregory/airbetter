import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    if (!value) {
      return null;
    }

    const hasNumber = /\d/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[!@#?]/.test(value);

    const msgs = {
      hasNumber: 'at least one number',
      hasUpper: 'at least one uppercased letter',
      hasLower: 'at least one lowercased letter',
      hasSpecial: 'at least one special symbol (!, @, #, ?)',
    };

    const getMsgPart = () => {
      const messages = [];

      if (!hasNumber) {
        messages.push(msgs.hasNumber);
      }

      if (!hasUpper) {
        messages.push(msgs.hasUpper);
      }

      if (!hasLower) {
        messages.push(msgs.hasLower);
      }

      if (!hasSpecial) {
        messages.push(msgs.hasSpecial);
      }

      return messages;
    };

    const invalidMsg =
      'Your password is not strong enough. It should have the following:';
    const messages = getMsgPart().join(', ');
    const message = messages.length ? `${invalidMsg} ${messages}` : null;

    const valid = hasNumber && hasUpper && hasLower && hasSpecial;
    return valid ? null : { strength: true, message };
  };
}
