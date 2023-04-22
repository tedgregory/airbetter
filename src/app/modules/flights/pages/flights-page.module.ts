import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from '../../../app-common.module';
import { ContainerModule } from 'src/app/ui/container/container.module';
import { GridModule } from 'src/app/ui/grid/grid.module';
import { FlightsPageComponent } from './flights-page.component';
import { FlightsPageRoutingModule } from './flights-page-routing.module';
import { FlightsSearchModule } from '../components/flights-search/flights-search.module';

@NgModule({
  imports: [
    CommonModule,
    FlightsPageRoutingModule,
    AppCommonModule,
    FlightsSearchModule,
    GridModule,
    ContainerModule,
  ],
  declarations: [FlightsPageComponent],
})
export class FlightsPageModule {}
