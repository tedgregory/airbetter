import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookingListComponent } from './booking-list.component';
import { BookingCardModule } from '../booking-card/booking-card.module';
import { BookingDetailsModule } from '../booking-details/booking-details.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BookingCardModule,
    BookingDetailsModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [BookingListComponent],
  exports: [BookingListComponent],
})
export class BookingListModule {}
