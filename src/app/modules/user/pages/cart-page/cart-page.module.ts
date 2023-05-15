import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { CartPageRoutingModule } from './cart-page-routing.module';
import { CartPageComponent } from './cart-page.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [CartPageComponent],
  imports: [
    CommonModule,
    CartPageRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSortModule,
    MatInputModule,
    FormsModule,
    TableModule,
    ConfirmDialogModule,
  ],
})
export class CartPageModule {}
