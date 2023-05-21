import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import { SearchActions } from './search.actions';
import { PassengersActions } from '../passengers/passengers.actions';
import { PassengerType } from '../common/common.models';

@Injectable() // how else to scope it?
export class SearchEffects {
  constructor(private readonly actions$: Actions, private store: Store) {}

  private setSearchData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchActions.setFlightSearchData),
      map((params) => {
        const passengers = params.data.passengers;
        return PassengersActions.setPassengers({
          adults: passengers[PassengerType.Adult]
            ? Array(params.data.passengers[PassengerType.Adult])
            : null,
          children: passengers[PassengerType.Child]
            ? Array(params.data.passengers[PassengerType.Child])
            : null,
          infants: passengers[PassengerType.Infant]
            ? Array(params.data.passengers[PassengerType.Infant])
            : null,
        });
      }),
      catchError((e) => of(SearchActions.setError({ error: e as Error })))
    );
  });
}
