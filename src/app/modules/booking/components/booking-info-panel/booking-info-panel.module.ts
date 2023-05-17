import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingInfoPanelComponent } from './booking-info-panel.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ContainerModule } from 'src/app/ui/container/container.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlightsServiceModule } from 'src/app/modules/flights/services/flights-service.module';
import { SelectPassengersModule } from 'src/app/modules/flights/components/select-passengers/select-passengers.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [BookingInfoPanelComponent],
  imports: [
    CommonModule,
    ContainerModule,
    ReactiveFormsModule,
    FlightsServiceModule,
    SelectPassengersModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [BookingInfoPanelComponent],
})
export class BookingInfoPanelModule {}
