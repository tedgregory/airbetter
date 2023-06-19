import { NgModule } from '@angular/core';
import { BookingVariantFlightDurationPipe } from './booking-variant-flight-duration.pipe';
import { DateFormatPipe } from './date-format.pipe';

const pipes = [BookingVariantFlightDurationPipe, DateFormatPipe];

@NgModule({
  declarations: [...pipes],
  exports: [...pipes],
})
export class BookingPipesModule {}
