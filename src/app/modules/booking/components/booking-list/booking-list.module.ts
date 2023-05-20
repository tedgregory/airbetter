import { CommonModule } from '@angular/common';
// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { BookingListComponent } from './booking-list.component';
import { BookingCardModule } from '../booking-card/booking-card.module';
import { BookingDetailsModule } from '../booking-details/booking-details.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { bookingFeature } from 'src/app/redux/booking/booking.reducer';
import { BookingEffects } from 'src/app/redux/booking/booking.effects';
import { passengersFeature } from 'src/app/redux/passengers/passengers.reducer';
import { userFeature } from 'src/app/redux/user/user.reducer';
import { searchFeature } from 'src/app/redux/search/search.reducer';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    SwiperModule,
    BookingCardModule,
    BookingDetailsModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forFeature(bookingFeature),
    StoreModule.forFeature(passengersFeature),
    StoreModule.forFeature(userFeature),
    StoreModule.forFeature(searchFeature),
    EffectsModule.forFeature([BookingEffects]),
  ],
  declarations: [BookingListComponent],
  exports: [BookingListComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookingListModule {}
