import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from 'src/app/core/icons/icons.module';
import { CoreDirectivesModule } from 'src/app/core/directives/core-directives.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthFormModule } from '../auth-form/auth-form.module';
import { AuthModalComponent } from './auth-modal.component';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    CoreDirectivesModule,
    MatButtonModule,
    MatIconModule,
    AuthFormModule,
    MatProgressSpinnerModule,
  ],
  declarations: [AuthModalComponent],
  exports: [AuthModalComponent],
})
export class AuthModalModule {}
