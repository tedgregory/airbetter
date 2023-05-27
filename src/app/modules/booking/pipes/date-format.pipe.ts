import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import { EDateFormats } from 'src/app/redux/common/common.models';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  dateFormat: EDateFormats | null = null;
  transform(
    date: string | null | undefined,
    format: EDateFormats = EDateFormats.YMD
  ): string {
    return date ? moment(date).format(format.toString()) : '';
  }
}
