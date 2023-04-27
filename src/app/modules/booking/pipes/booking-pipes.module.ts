import { NgModule } from '@angular/core';
import { BookingVariantFirstImagePipe } from './booking-variant-first-image.pipe';
import { BookingVariantImagesPipe } from './booking-variant-images.pipe';
import { BookingVariantFlightDurationPipe } from './booking-variant-flight-duration.pipe';

const pipes = [
  BookingVariantImagesPipe,
  BookingVariantFirstImagePipe,
  BookingVariantFlightDurationPipe,
];

@NgModule({
  declarations: [...pipes],
  exports: [...pipes],
})
export class BookingPipesModule {}
