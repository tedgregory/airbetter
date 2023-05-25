import { Component, Input } from '@angular/core';
import { ECurrencies } from 'src/app/redux/common/common.models';

@Component({
  selector: 'app-booking-summary-price',
  templateUrl: './booking-summary-price.component.html',
})
export class BookingSummaryPriceComponent {
  @Input()
  basePrice: Record<string, number> = {};
  @Input()
  currency: ECurrencies | null = null;
  @Input()
  passengersQuantity: number[] = [];

  pricesViewData: Record<string, number | string>[] = [];

  buildPricesData() {
    this.pricesViewData = [
      {
        type: 'Adult',
        amount: 1,
        totalPrice: 257.31,
        farePrice: 166.0,
        otherPrice: 91.31,
      },
      {
        type: 'Child',
        amount: 1,
        totalPrice: 196.08,
        farePrice: 106.0,
        otherPrice: 90.08,
      },
      {
        type: 'Infant',
        amount: 1,
        totalPrice: 98.0,
        farePrice: 88.0,
        otherPrice: 10.0,
      },
    ];
  }

  countTotalPrice(): number {
    return this.pricesViewData.reduce(
      (total, price) => total + +price['totalPrice'],
      0
    );
  }
}
