import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingSummaryPriceComponent } from './booking-summary-price.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [BookingSummaryPriceComponent],
  imports: [CommonModule, MatCardModule],
  exports: [BookingSummaryPriceComponent],
})
export class BookingSummaryPriceModule {}
