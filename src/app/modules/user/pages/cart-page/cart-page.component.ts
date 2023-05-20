import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent {
  @HostBinding('class') class = 'cart-page';
}
