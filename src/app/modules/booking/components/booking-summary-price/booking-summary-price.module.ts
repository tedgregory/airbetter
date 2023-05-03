import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingSummaryPriceComponent } from './booking-summary-price.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [BookingSummaryPriceComponent],
  imports: [CommonModule, MatCardModule, MatDividerModule],
  exports: [BookingSummaryPriceComponent],
})
export class BookingSummaryPriceModule {}
