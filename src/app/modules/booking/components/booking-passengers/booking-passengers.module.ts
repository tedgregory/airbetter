import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingPassengersComponent } from './booking-passengers.component';
import { BookingPassengersCardModule } from '../booking-passengers-card/booking-passengers-card.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BookingPassengersContactsModule } from '../booking-passengers-contacts/booking-passengers-contacts.module';

@NgModule({
  declarations: [BookingPassengersComponent],
  imports: [
    CommonModule,
    BookingPassengersCardModule,
    BookingPassengersContactsModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [BookingPassengersComponent],
})
export class BookingPassengersModule {}
