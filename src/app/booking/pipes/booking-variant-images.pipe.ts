import { Pipe, PipeTransform } from '@angular/core';
import { BookingVariant } from 'src/app/booking/models';

@Pipe({
  name: 'bookingVariantImages',
})
export class BookingVariantImagesPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(bookingVariant: BookingVariant): string[] {
    return [''];
    // return bookingVariant.flight?.photos ?? [];
  }
}
