import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingPassendersCardComponent } from './booking-passenders-card.component';

import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [BookingPassendersCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
  ],
  exports: [BookingPassendersCardComponent],
})
export class BookingPassendersCardModule {}
