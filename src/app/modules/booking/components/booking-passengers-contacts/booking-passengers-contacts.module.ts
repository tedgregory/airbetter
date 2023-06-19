import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreServiceModule } from 'src/app/core/services/core-service.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BookingPassengersContactsComponent } from './booking-passengers-contacts.component';

@NgModule({
  declarations: [BookingPassengersContactsComponent],
  imports: [
    CommonModule,
    CoreServiceModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  exports: [BookingPassengersContactsComponent],
})
export class BookingPassengersContactsModule {}
