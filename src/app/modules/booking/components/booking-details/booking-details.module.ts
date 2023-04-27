import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDetailsComponent } from './booking-details.component';
import { BookingPipesModule } from '../../pipes/booking-pipes.module';

@NgModule({
  declarations: [BookingDetailsComponent],
  imports: [CommonModule, BookingPipesModule],
  exports: [BookingDetailsComponent],
})
export class BookingDetailsModule {}
