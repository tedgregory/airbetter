import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageComponent } from './user-page.component';
import { UserPageRoutingModule } from './user-page-routing.module';
import { UserModule } from '../../components/user/user.module';

@NgModule({
  declarations: [UserPageComponent],
  imports: [CommonModule, UserPageRoutingModule, UserModule],
})
export class UserPageModule {}
