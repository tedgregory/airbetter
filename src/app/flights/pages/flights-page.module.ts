import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlightsServiceModule } from '@app/flights/service';
import { FlightsStateModule } from '@app/flights/state';
import { ContainerModule } from '@app/ui/container';
import { GridModule } from '@app/ui/grid';
import { AppCommonModule } from '../../app-common.module';
import { FlightsPageComponent } from './flights-page.component';
import { FlightsPageRoutingModule } from './flights-page-routing.module';
import { FlightsSearchModule } from '@app/flights/components';

@NgModule({
  imports: [
    CommonModule,
    FlightsPageRoutingModule,
    AppCommonModule,
    FlightsSearchModule,
    FlightsServiceModule,
    FlightsStateModule,
    GridModule,
    ContainerModule,
  ],
  declarations: [FlightsPageComponent],
})
export class FlightsPageModule {}
