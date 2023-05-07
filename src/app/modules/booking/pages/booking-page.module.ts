import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppCommonModule } from '../../../app-common.module';
import { ContainerModule } from 'src/app/ui/container/container.module';
import { GridModule } from 'src/app/ui/grid/grid.module';
import { BookingPageComponent } from './booking-page.component';
import { BookingPageRoutingModule } from './booking-page-routing.module';
import { BookingServiceModule } from '../services/booking-service.module';
import { BookingListModule } from '../components/booking-list/booking-list.module';
import { BookingCardModule } from '../components/booking-card/booking-card.module';
import { BookingPassengersModule } from '../components/booking-passengers/booking-passengers.module';
import { BookingSummaryModule } from '../components/booking-summary/booking-summary.module';

@NgModule({
  imports: [
    CommonModule,
    BookingPageRoutingModule,
    AppCommonModule,
    BookingServiceModule,
    BookingListModule,
    BookingCardModule,
    BookingPassengersModule,
    BookingSummaryModule,
    MatIconModule,
    MatButtonModule,
    GridModule,
    ContainerModule,
  ],
  declarations: [BookingPageComponent],
})
export class BookingPageModule {}
