import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    TableModule,
    RouterModule,
  ],
  exports: [OrdersComponent],
})
export class OrdersModule {}
