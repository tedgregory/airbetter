import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookingListComponent } from './booking-list.component';
import { BookingCardModule } from '../booking-card/booking-card.module';
import { BookingDetailsModule } from '../booking-details/booking-details.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BookingCardModule,
    BookingDetailsModule,
  ],
  declarations: [BookingListComponent],
  exports: [BookingListComponent],
})
export class BookingListModule {}
