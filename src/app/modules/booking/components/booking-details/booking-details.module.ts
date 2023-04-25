import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDetailsComponent } from './booking-details.component';

@NgModule({
  declarations: [BookingDetailsComponent],
  imports: [CommonModule],
  exports: [BookingDetailsComponent],
})
export class BookingDetailsModule {}
