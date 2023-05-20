import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BookingPassengersContactsComponent } from './booking-passengers-contacts.component';

@NgModule({
  declarations: [BookingPassengersContactsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
  ],
  exports: [BookingPassengersContactsComponent],
})
export class BookingPassengersContactsModule {}
