import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingPassendersContactsComponent } from './booking-passenders-contacts.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [BookingPassendersContactsComponent],
  imports: [CommonModule, MatCardModule, MatSelectModule, MatInputModule],
  exports: [BookingPassendersContactsComponent],
})
export class BookingPassendersContactsModule {}
