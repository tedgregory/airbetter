import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookingVariantFlightDuration',
})
export class BookingVariantFlightDurationPipe implements PipeTransform {
  transform(totalMinutes: number): unknown {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes - hours * 60;
    return `${hours}h ${minutes}m`;
  }
}
