import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookingVariantFlightDuration',
})
export class BookingVariantFlightDurationPipe implements PipeTransform {
  transform(seconds: number): unknown {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.ceil((seconds - hours * 3600) / 60);
    return `${hours}h ${minutes}m`;
  }
}
