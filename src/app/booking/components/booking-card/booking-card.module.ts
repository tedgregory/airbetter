import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookingPipesModule } from '@app/booking/pipes';
import { BookingCardComponent } from './booking-card.component';

@NgModule({
  imports: [CommonModule, BookingPipesModule],
  declarations: [BookingCardComponent],
  exports: [BookingCardComponent],
})
export class BookingCardModule {}
