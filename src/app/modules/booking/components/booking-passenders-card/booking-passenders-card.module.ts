import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingPassendersCardComponent } from './booking-passenders-card.component';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [BookingPassendersCardComponent],
  imports: [CommonModule, MatCardModule],
  exports: [BookingPassendersCardComponent],
})
export class BookingPassendersCardModule {}
