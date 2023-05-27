import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ECurrencies } from 'src/app/redux/common/common.models';

@Component({
  selector: 'app-booking-summary-price',
  templateUrl: './booking-summary-price.component.html',
})
export class BookingSummaryPriceComponent implements OnInit {
  @Input()
  basePrice: Record<ECurrencies, number> | undefined | null;
  @Input()
  currency: ECurrencies | undefined = undefined;
  @Input()
  passengersQuantity: number[] = [];

  pricesViewData = new BehaviorSubject<Record<string, number | string>[]>([]);

  ngOnInit(): void {
    this.buildPricesData();
  }

  buildPricesData() {
    if (!this.currency || !this.basePrice) {
      return;
    }
    const [adultsCount, childCount, infantCount] = this.passengersQuantity;
    const basePrice = this.basePrice[this.currency];
    const childPrice = basePrice * 0.76;
    const infantPrice = basePrice * 0.44;
    this.pricesViewData.next([
      {
        type: 'Adult',
        amount: adultsCount,
        totalPrice: basePrice,
        farePrice: basePrice * 0.7,
        otherPrice: basePrice * 0.3,
      },
      {
        type: 'Child',
        amount: childCount,
        totalPrice: childPrice,
        farePrice: childPrice * 0.8,
        otherPrice: childPrice * 0.2,
      },
      {
        type: 'Infant',
        amount: infantCount,
        totalPrice: infantPrice,
        farePrice: infantPrice * 0.9,
        otherPrice: infantPrice * 0.1,
      },
    ]);
  }

  get totalPrice(): number {
    return this.pricesViewData.value.reduce(
      (total, price) => total + +price['totalPrice'],
      0
    );
  }
}
