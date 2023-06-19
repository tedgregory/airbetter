import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BookingSummaryFlightModule } from '../booking-summary-flight/booking-summary-flight.module';
import { BookingSummaryPriceModule } from '../booking-summary-price/booking-summary-price.module';
import { BookingSummaryComponent } from './booking-summary.component';

@NgModule({
  declarations: [BookingSummaryComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    BookingSummaryFlightModule,
    BookingSummaryPriceModule,
  ],
  exports: [BookingSummaryComponent],
})
export class BookingSummaryModule {}
