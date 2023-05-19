import { Component } from '@angular/core';

@Component({
  selector: 'app-booking-summary-price',
  templateUrl: './booking-summary-price.component.html',
  styles: [],
})
export class BookingSummaryPriceComponent {
  currencyType = 'EUR';

  prices = [
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

  countTotalPrice(): number {
    return this.prices.reduce((total, price) => total + price.totalPrice, 0);
  }
}
