import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
})
export class AuthFormComponent {
  isPasswordHidden = true;

  selectedCountryCodeValue = '';

  selectedCitizenshipValue = '';

  countryCodes = ['Afghanistan (+93)', 'Anguilla (+1)', 'Argentina (+54)'];

  citizenshipValues = ['US', 'Polish', 'Mexican'];
}
