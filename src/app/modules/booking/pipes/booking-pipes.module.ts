import { NgModule } from '@angular/core';
import { BookingVariantFlightDurationPipe } from './booking-variant-flight-duration.pipe';

const pipes = [BookingVariantFlightDurationPipe];

@NgModule({
  declarations: [...pipes],
  exports: [...pipes],
})
export class BookingPipesModule {}
