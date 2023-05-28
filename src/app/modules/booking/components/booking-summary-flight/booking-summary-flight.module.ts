import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingSummaryFlightComponent } from './booking-summary-flight.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [BookingSummaryFlightComponent],
  imports: [CommonModule, MatCardModule, MatDividerModule],
  exports: [BookingSummaryFlightComponent],
})
export class BookingSummaryFlightModule {}
