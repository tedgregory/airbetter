import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDetailsComponent } from './booking-details.component';
import { BookingPipesModule } from '../../pipes/booking-pipes.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [BookingDetailsComponent],
  imports: [CommonModule, BookingPipesModule, MatButtonModule],
  exports: [BookingDetailsComponent],
})
export class BookingDetailsModule {}
