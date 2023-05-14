import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from './productservice';

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

export interface IFlight {
  number: string;
  flight: string[];
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
export class CartPageComponent implements OnInit {
  products!: Product[];

  product!: Product;

  selectedProducts!: Product[] | null;

  currencyType = 'EUR';

  flightsData: IFlight[] = [
    {
      number: 'FR 1925',
      flight: ['Dublin — Warsaw', 'Modlin — Dublin'],
      typeTrip: 'Round Trip',
      date: ['1 Mar, 2023, 8:40 — 12:00', '18 Mar, 2023, 7:40 — 11:00'],
      passengers: ['1 x Adult', '1 x Child', '1 x Infant'],
      price: 551.38,
    },
    {
      number: 'FR 1936',
      flight: ['Gdansk — Warsaw'],
      typeTrip: 'One way',
      date: ['28 May, 2023, 15:40 — 16:40'],
      passengers: ['1 x Adult'],
      price: 20.96,
    },
  ];

  sortedData: IFlight[];

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.sortedData = this.flightsData.slice();
  }

  ngOnInit() {
    this.productService.getProducts().then((data) => (this.products = data));
  }

  editProduct(product: Product) {
    // this.product = { ...product };
    // this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  sortData(sort: Sort) {
    const data = this.flightsData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'number':
          return compare(a.number, b.number, isAsc);
        case 'flight':
          return compare(a.flight.join(''), b.flight.join(''), isAsc);
        case 'typeTrip':
          return compare(a.typeTrip, b.typeTrip, isAsc);
        case 'date':
          return compare(new Date(a.date[0]), new Date(b.date[0]), isAsc);
        case 'passengers':
          return compare(a.passengers.length, b.passengers.length, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        default:
          return 0;
      }
    });
  }

  countGeneral(): number {
    return this.flightsData.reduce((total, curr) => total + curr.price, 0);
  }
}

function compareDates(a: Date, b: Date, isAsc: boolean) {
  return (a.getTime() < b.getTime() ? -1 : 1) * (isAsc ? 1 : -1);
}

function compare(
  a: Date | number | string,
  b: Date | number | string,
  isAsc: boolean
) {
  if (a instanceof Date && b instanceof Date) {
    return compareDates(a, b, isAsc);
  } else {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
