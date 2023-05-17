import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectPassengersComponent } from './select-passengers.component';
import { FormsModule } from '@angular/forms';
import { CoreDirectivesModule } from 'src/app/core/directives/core-directives.module';
import { IncrementerModule } from '../incrementer/incrementer.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreDirectivesModule,
    IncrementerModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [SelectPassengersComponent],
  exports: [SelectPassengersComponent],
})
export class SelectPassengersModule {}
