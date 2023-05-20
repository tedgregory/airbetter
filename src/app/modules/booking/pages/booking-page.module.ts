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
import { BookingInfoPanelModule } from '../components/booking-info-panel/booking-info-panel.module';
import { StoreModule } from '@ngrx/store';
import { bookingFeature } from 'src/app/redux/booking/booking.reducer';
import { passengersFeature } from 'src/app/redux/passengers/passengers.reducer';
import { userFeature } from 'src/app/redux/user/user.reducer';
import { searchFeature } from 'src/app/redux/search/search.reducer';
import { BookingEffects } from 'src/app/redux/booking/booking.effects';
import { EffectsModule } from '@ngrx/effects';

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
    BookingInfoPanelModule,
    StoreModule.forFeature(bookingFeature),
    StoreModule.forFeature(passengersFeature),
    StoreModule.forFeature(userFeature),
    StoreModule.forFeature(searchFeature),
    EffectsModule.forFeature([BookingEffects]),
  ],
  declarations: [BookingPageComponent],
})
export class BookingPageModule {}
