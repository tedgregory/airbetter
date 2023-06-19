import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

export interface IFlight {
  number: string;
  name: string[];
  typeTrip: string;
  date: string[];
  passengers: string[];
  price: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  providers: [MessageService, ConfirmationService],
})
export class CartComponent {
  currencyType = 'EUR';

  flight!: IFlight;

  selectedFlights!: IFlight[] | null;

  flightsData: IFlight[] = [
    {
      number: 'FR 1925',
      name: ['Dublin — Warsaw', 'Modlin — Dublin'],
      typeTrip: 'Round Trip',
      date: ['1 Mar, 2023, 8:40 — 12:00', '18 Mar, 2023, 7:40 — 11:00'],
      passengers: ['1 x Adult', '1 x Child', '1 x Infant'],
      price: 551.38,
    },
    {
      number: 'FR 1936',
      name: ['Gdansk — Warsaw'],
      typeTrip: 'One way',
      date: ['28 May, 2023, 15:40 — 16:40'],
      passengers: ['1 x Adult'],
      price: 20.96,
    },
  ];

  promoCodes = ['RS', 'FLY', '2023'];

  appliedCodes: string[] = [];

  promoCodeValue = '';

  isDiscount = false;

  onContextMenuDeleteClick(flight: IFlight | null) {
    if (!flight) return;

    this.flightsData = this.flightsData.filter(
      (val) => val.number !== flight.number
    );

    if (!this.selectedFlights) return;

    this.selectedFlights = this.selectedFlights.filter(
      (item) => item !== flight
    );
  }

  onContextMenuEditClick(flight: IFlight | null) {
    if (!flight) return;
  }

  countTotalPrice(): number {
    return this.selectedFlights
      ? this.selectedFlights.reduce(
          (total, curr) => total + (curr.price ? curr.price : 0),
          0
        )
      : 0;
  }

  countDiscountPrice(): number {
    const discount = 1 - this.appliedCodes.length * 0.1;
    return this.countTotalPrice() * discount;
  }

  setDiscount() {
    if (
      this.promoCodes.includes(this.promoCodeValue) &&
      !this.appliedCodes.includes(this.promoCodeValue)
    ) {
      this.isDiscount = true;
      this.appliedCodes.push(this.promoCodeValue);
    }
  }
}
