import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthSocialComponent } from './auth-social.component';

@NgModule({
  imports: [MatButtonModule, MatIconModule],
  declarations: [AuthSocialComponent],
  exports: [AuthSocialComponent],
})
export class AuthSocialModule {}
