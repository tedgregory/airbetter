import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ECurrencies } from 'src/app/redux/common/common.models';

@Component({
  selector: 'app-booking-summary-price',
  templateUrl: './booking-summary-price.component.html',
})
export class BookingSummaryPriceComponent implements OnInit {
  @Input()
  basePrice$: Observable<Record<ECurrencies, number> | null> | null = null;
  @Input()
  currency: ECurrencies | undefined = undefined;
  @Input()
  passengersQuantity: number[] = [];

  pricesViewData: Record<string, number | string>[] | null = null;

  ngOnInit(): void {
    this.basePrice$ &&
      this.basePrice$.subscribe((data) => {
        if (!data) return;
        this.buildPricesData(data);
      });
  }

  buildPricesData(base: Record<ECurrencies, number>) {
    if (!this.currency || !base) {
      return;
    }
    const [adultsCount, childCount, infantCount] = this.passengersQuantity;
    const basePrice = base[this.currency] * adultsCount;
    const childPrice = basePrice * 0.76 * childCount;
    const infantPrice = basePrice * 0.44 * infantCount;
    this.pricesViewData = [
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
    ];
  }

  get totalPrice(): number {
    return (
      this.pricesViewData?.reduce(
        (total, price) => total + +price['totalPrice'],
        0
      ) || 0
    );
  }
}
