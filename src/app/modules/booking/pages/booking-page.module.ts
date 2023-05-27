import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from '../../../app-common.module';
import { BookingPageComponent } from './booking-page.component';
import { BookingPageRoutingModule } from './booking-page-routing.module';
import { BookingServiceModule } from '../services/booking-service.module';
import { BookingInfoPanelModule } from '../components/booking-info-panel/booking-info-panel.module';
import { StoreModule } from '@ngrx/store';
import { bookingFeature } from 'src/app/redux/booking/booking.reducer';
import { passengersFeature } from 'src/app/redux/passengers/passengers.reducer';
import { userFeature } from 'src/app/redux/user/user.reducer';
import { searchFeature } from 'src/app/redux/search/search.reducer';
import { BookingEffects } from 'src/app/redux/booking/booking.effects';
import { EffectsModule } from '@ngrx/effects';
import { BookingStepperModule } from '../components/booking-stepper/booking-stepper.module';
import { SearchEffects } from 'src/app/redux/search/search.effects';
import { PassengersEffects } from 'src/app/redux/passengers/passengers.effects';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    BookingPageRoutingModule,
    BookingServiceModule,
    BookingInfoPanelModule,
    StoreModule.forFeature(bookingFeature),
    StoreModule.forFeature(passengersFeature),
    StoreModule.forFeature(userFeature),
    StoreModule.forFeature(searchFeature),
    EffectsModule.forFeature([
      BookingEffects,
      SearchEffects,
      PassengersEffects,
    ]),
    BookingStepperModule,
  ],
  declarations: [BookingPageComponent],
})
export class BookingPageModule {}
