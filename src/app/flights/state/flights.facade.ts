import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
// import { FlightDetails } from 'src/app/flights/models';
// import * as FlightsActions from './flights.actions';
import { FlightsState } from './flights.reducer';
import * as FlightsSelectors from './flights.selectors';

@Injectable()
export class FlightsFacade {
  flights$ = this.store.select(FlightsSelectors.selectFlights);

  constructor(private readonly store: Store<FlightsState>) {}

  // setFlight(payload: FlightDetails) {
  //   this.dispatch(FlightsActions.setFlight({ payload }));
  // }

  // clearFlights() {
  //   this.dispatch(FlightsActions.clearFlights());
  // }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
