import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from 'src/app/core/icons/icons.module';
import { CoreDirectivesModule } from 'src/app/core/directives/core-directives.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserModalComponent } from './user-modal.component';

@NgModule({
  declarations: [UserModalComponent],
  imports: [
    CommonModule,
    IconsModule,
    CoreDirectivesModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [UserModalComponent],
})
export class UserModalModule {}
