import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingPassengersContactsComponent } from './booking-passengers-contacts.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BookingPassengersContactsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  exports: [BookingPassengersContactsComponent],
})
export class BookingPassengersContactsModule {}
