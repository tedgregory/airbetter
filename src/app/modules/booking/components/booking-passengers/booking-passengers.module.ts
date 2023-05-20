import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BookingPassengersCardModule } from '../booking-passengers-card/booking-passengers-card.module';
import { BookingPassengersContactsModule } from '../booking-passengers-contacts/booking-passengers-contacts.module';
import { BookingPassengersComponent } from './booking-passengers.component';

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
