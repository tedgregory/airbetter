import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookingPipesModule } from '../../pipes/booking-pipes.module';
import { BookingCardComponent } from './booking-card.component';
import { BookingDirectivesModule } from '../../directives/booking-directives.module';

@NgModule({
  imports: [CommonModule, BookingPipesModule, BookingDirectivesModule],
  declarations: [BookingCardComponent],
  exports: [BookingCardComponent],
})
export class BookingCardModule {}
