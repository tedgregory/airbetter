import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartPageRoutingModule } from './cart-page-routing.module';
import { CartPageComponent } from './cart-page.component';
import { CartModule } from '../../components/cart/cart.module';

@NgModule({
  declarations: [CartPageComponent],
  imports: [CommonModule, CartPageRoutingModule, CartModule],
})
export class CartPageModule {}
