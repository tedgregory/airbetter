import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingSummaryFlightComponent } from './booking-summary-flight.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { StoreModule } from '@ngrx/store';
import { passengersFeature } from 'src/app/redux/passengers/passengers.reducer';

@NgModule({
  declarations: [BookingSummaryFlightComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    StoreModule.forFeature(passengersFeature),
  ],
  exports: [BookingSummaryFlightComponent],
})
export class BookingSummaryFlightModule {}
