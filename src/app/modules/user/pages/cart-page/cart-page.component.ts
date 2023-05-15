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
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
  providers: [MessageService, ConfirmationService],
})
export class CartPageComponent {
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

  // editProduct(flight: IFlight) {
  // this.product = { ...product };
  // this.productDialog = true;
  // }

  onContextMenuDeleteClick(flight: IFlight | null) {
    if (!flight) return;

    this.flightsData = this.flightsData.filter(
      (val) => val.number !== flight.number
    );

    // this.flight = {};
  }

  onContextMenuEditClick(flight: IFlight | null) {
    if (!flight) return;
  }

  countGeneral(): number {
    return this.selectedFlights
      ? this.selectedFlights.reduce(
          (total, curr) => total + (curr.price ? curr.price : 0),
          0
        )
      : 0;
  }
}
