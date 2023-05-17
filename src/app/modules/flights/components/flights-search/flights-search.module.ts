import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlightsSearchComponent } from './flights-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GridModule } from 'src/app/ui/grid/grid.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { SelectPassengersModule } from '../select-passengers/select-passengers.module';
import { FlightsServiceModule } from '../../services/flights-service.module';

@NgModule({
  imports: [
    CommonModule,
    GridModule,
    ReactiveFormsModule,
    FlightsServiceModule,
    SelectPassengersModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  declarations: [FlightsSearchComponent],
  exports: [FlightsSearchComponent],
})
export class FlightsSearchModule {}
