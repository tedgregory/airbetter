import { Component, Input, OnInit } from '@angular/core';
import { ECurrencies } from 'src/app/redux/common/common.models';

@Component({
  selector: 'app-booking-summary-price',
  templateUrl: './booking-summary-price.component.html',
})
export class BookingSummaryPriceComponent implements OnInit {
  @Input()
  basePrice: Record<ECurrencies, number> | undefined = undefined;
  @Input()
  currency: ECurrencies | undefined = undefined;
  @Input()
  passengersQuantity: number[] = [];

  pricesViewData: Record<string, number | string>[] = [];

  ngOnInit(): void {
    this.buildPricesData();
  }

  buildPricesData() {
    const base =
      this.currency && this.basePrice
        ? this.basePrice[this.currency]
        : this.basePrice?.[ECurrencies.EUR] || 500;
    const childPrice = base * 0.8;
    const infantPrice = base * 0.4;
    this.pricesViewData = [
      {
        type: 'Adult',
        amount: this.passengersQuantity[0],
        totalPrice: base,
        farePrice: base * 0.7,
        otherPrice: base * 0.3,
      },
      {
        type: 'Child',
        amount: this.passengersQuantity[1],
        totalPrice: childPrice,
        farePrice: childPrice * 0.8,
        otherPrice: childPrice * 0.2,
      },
      {
        type: 'Infant',
        amount: this.passengersQuantity[2],
        totalPrice: infantPrice,
        farePrice: infantPrice * 0.9,
        otherPrice: infantPrice * 0.1,
      },
    ];
  }

  get totalPrice(): number {
    return this.pricesViewData.reduce(
      (total, price) => total + +price['totalPrice'],
      0
    );
  }
}
