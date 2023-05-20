import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from '../../../app-common.module';
import { BookingPageComponent } from './booking-page.component';
import { BookingPageRoutingModule } from './booking-page-routing.module';
import { BookingServiceModule } from '../services/booking-service.module';
import { BookingInfoPanelModule } from '../components/booking-info-panel/booking-info-panel.module';
import { BookingStepperModule } from '../components/booking-stepper/booking-stepper.module';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    BookingPageRoutingModule,
    BookingServiceModule,
    BookingInfoPanelModule,
    BookingStepperModule,
  ],
  declarations: [BookingPageComponent],
})
export class BookingPageModule {}
