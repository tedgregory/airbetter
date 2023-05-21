import { Component } from '@angular/core';
import { IFlight } from '../cart/cart.component';

@Component({
  selector: 'app-user',
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  currencyType = 'EUR';

  flight!: IFlight;

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
}
