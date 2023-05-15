import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-auth-social',
  templateUrl: './auth-social.component.html',
})
export class AuthSocialComponent {
  @HostBinding('class') class = 'auth-social';
}
