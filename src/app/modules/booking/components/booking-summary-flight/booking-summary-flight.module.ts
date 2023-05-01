import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingSummaryFlightComponent } from './booking-summary-flight.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [BookingSummaryFlightComponent],
  imports: [CommonModule, MatCardModule],
  exports: [BookingSummaryFlightComponent],
})
export class BookingSummaryFlightModule {}
