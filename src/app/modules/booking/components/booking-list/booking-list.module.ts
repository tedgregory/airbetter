import { CommonModule } from '@angular/common';
// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookingListComponent } from './booking-list.component';
import { BookingCardModule } from '../booking-card/booking-card.module';
import { BookingDetailsModule } from '../booking-details/booking-details.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule,
    BookingCardModule,
    BookingDetailsModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [BookingListComponent],
  exports: [BookingListComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookingListModule {}
