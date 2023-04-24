import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingPassengersComponent } from './booking-passengers.component';
import { BookingPassendersCardModule } from '../booking-passenders-card/booking-passenders-card.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BookingPassendersContactsModule } from '../booking-passenders-contacts/booking-passenders-contacts.module';

@NgModule({
  declarations: [BookingPassengersComponent],
  imports: [
    CommonModule,
    BookingPassendersCardModule,
    BookingPassendersContactsModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [BookingPassengersComponent],
})
export class BookingPassengersModule {}
