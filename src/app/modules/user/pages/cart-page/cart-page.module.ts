import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartPageRoutingModule } from './cart-page-routing.module';
import { CartPageComponent } from './cart-page.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [CartPageComponent],
  imports: [
    CommonModule,
    CartPageRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatSortModule,
    MatInputModule,
  ],
})
export class CartPageModule {}
