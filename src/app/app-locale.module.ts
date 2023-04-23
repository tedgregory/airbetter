import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

registerLocaleData(localeEn);

@NgModule({
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-EN',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'USD',
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-EN',
    },
  ],
})
export class AppLocaleModule {}
