import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { searchFeature } from 'src/app/redux/search/search.reducer';

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
  constructor(private store: Store) {
    super('en-US');
  }

  private fixDigit(n: number): string {
    return ('00' + n).slice(-2);
  }

  override format(date: Date, displayFormat: string): string {
    if (displayFormat === 'input') {
      const date$ = this.store.select(searchFeature.selectDateFormat);
      let dateFormat = '';
      date$.subscribe((value) => {
        switch (value.toString()) {
          case 'MM/DD/YYYY':
            dateFormat = `${this.fixDigit(date.getMonth() + 1)}/${this.fixDigit(
              date.getDate()
            )}/${date.getFullYear()}`;
            break;
          case 'DD/MM/YYYY':
            dateFormat = `${this.fixDigit(date.getDate())}/${this.fixDigit(
              date.getMonth() + 1
            )}/${date.getFullYear()}`;
            break;
          case 'YYYY/DD/MM':
            dateFormat = `${date.getFullYear()}/${this.fixDigit(
              date.getDate()
            )}/${this.fixDigit(date.getMonth() + 1)}`;
            break;
          case 'YYYY/MM/DD':
            dateFormat = `${date.getFullYear()}/${this.fixDigit(
              date.getMonth() + 1
            )}/${this.fixDigit(date.getDate())}`;
            break;
        }
      });
      return dateFormat;
    } else {
      return date.toDateString();
    }
  }
}

export const APP_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', date: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};
