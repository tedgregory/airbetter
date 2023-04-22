import { Pipe, PipeTransform } from '@angular/core';
import { BookingVariant } from 'src/app/booking/models';

@Pipe({
  name: 'bookingVariantFirstImage',
})
export class BookingVariantFirstImagePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(bookingVariant: BookingVariant): string | null {
    return '';
    // return bookingVariant.flight?.photos?.length ? bookingVariant.flight?.photos[0] : null;
  }
}
