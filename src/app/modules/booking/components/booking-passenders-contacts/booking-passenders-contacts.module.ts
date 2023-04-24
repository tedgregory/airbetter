import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingPassendersContactsComponent } from './booking-passenders-contacts.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [BookingPassendersContactsComponent],
  imports: [CommonModule, MatCardModule],
  exports: [BookingPassendersContactsComponent],
})
export class BookingPassendersContactsModule {}
