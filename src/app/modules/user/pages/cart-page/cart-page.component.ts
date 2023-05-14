import { Component } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';

export interface IFlight {
  number?: string;
  name?: string[];
  typeTrip?: string;
  date?: string[];
  passengers?: string[];
  price?: number;
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

  tableMenu = [{ label: 'Delete' }, { label: 'Edit' }];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  editProduct(flight: IFlight) {
    // this.product = { ...product };
    // this.productDialog = true;
  }

  deleteProduct(flight: IFlight) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + flight.number + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.flightsData = this.flightsData.filter(
          (val) => val.number !== flight.number
        );
        this.flight = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
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
