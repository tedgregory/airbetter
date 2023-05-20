import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookingStepperComponent } from './booking-stepper.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookingListModule } from '../booking-list/booking-list.module';
import { BookingPassengersModule } from '../booking-passengers/booking-passengers.module';
import { BookingSummaryModule } from '../booking-summary/booking-summary.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    BookingListModule,
    BookingPassengersModule,
    BookingSummaryModule,
  ],
  declarations: [BookingStepperComponent],
  exports: [BookingStepperComponent],
})
export class BookingStepperModule {}
