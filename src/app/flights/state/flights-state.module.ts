import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FlightsEffects } from './flights.effects';
import { FlightsFacade } from './flights.facade';
import { FLIGHTS_FEATURE_KEY, reducer } from './flights.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(FLIGHTS_FEATURE_KEY, reducer),
    EffectsModule.forFeature([FlightsEffects]),
  ],
  providers: [FlightsFacade],
})
export class FlightsStateModule {}
