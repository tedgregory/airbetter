import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from '../../../app-common.module';
import { ContainerModule } from 'src/app/ui/container/container.module';
import { GridModule } from 'src/app/ui/grid/grid.module';
import { FlightsPageComponent } from './flights-page.component';
import { FlightsPageRoutingModule } from './flights-page-routing.module';
import { FlightsSearchModule } from '../components/flights-search/flights-search.module';
import { StoreModule } from '@ngrx/store';
import { passengersFeature } from 'src/app/redux/passengers/passengers.reducer';
import { searchFeature } from 'src/app/redux/search/search.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from 'src/app/redux/search/search.effects';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    FlightsPageRoutingModule,
    FlightsSearchModule,
    GridModule,
    ContainerModule,
    StoreModule.forFeature(passengersFeature),
    StoreModule.forFeature(searchFeature),
    EffectsModule.forFeature([SearchEffects]),
  ],
  declarations: [FlightsPageComponent],
})
export class FlightsPageModule {}
