import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookingListComponent } from './booking-list.component';
import { BookingCardModule } from '../booking-card/booking-card.module';
import { BookingDetailsModule } from '../booking-details/booking-details.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { bookingFeature } from 'src/app/redux/reducers/booking.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookingEffects } from 'src/app/redux/effects/booking.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BookingCardModule,
    BookingDetailsModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forFeature(bookingFeature),
    EffectsModule.forFeature([BookingEffects]),
  ],
  declarations: [BookingListComponent],
  exports: [BookingListComponent],
})
export class BookingListModule {}
