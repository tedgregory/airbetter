import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { SearchActions } from './search.actions';
import { PassengersActions } from '../passengers/passengers.actions';
import { EPassengerType } from '../common/common.models';
import { BookingActions } from '../booking/booking.actions';
import { BookingPassenger } from '../passengers/passengers.state';
import { passengersFeature } from '../passengers/passengers.reducer';

@Injectable() // how else to scope it?
export class SearchEffects {
  constructor(private readonly actions$: Actions, private store: Store) {}

  private setSearchData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchActions.setFlightSearchData),
      concatLatestFrom(() =>
        this.store.select(passengersFeature.selectPassengersState)
      ),
      map(([params, passStored]) => {
        const paramPassengers = params.data.passengers;
        return PassengersActions.setPassengers({
          adults: this.mergePassengers(
            passStored.adults,
            paramPassengers[EPassengerType.Adult]
          ),
          children: this.mergePassengers(
            passStored.children,
            paramPassengers[EPassengerType.Child]
          ),
          infants: this.mergePassengers(
            passStored.infants as BookingPassenger[],
            paramPassengers[EPassengerType.Infant]
          ),
        });
      }),
      catchError((e) => of(SearchActions.setError({ error: e as Error })))
    );
  });

  private updateVariants$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        SearchActions.setDateLeave,
        SearchActions.setDateReturn,
        SearchActions.setDatesRange,
        SearchActions.setFlyFrom,
        SearchActions.setFlyTo
      ),
      switchMap(() => {
        return of(BookingActions.getVariants());
      })
    );
  });

  mergePassengers(previuos: BookingPassenger[] | null, amount: number) {
    if (!previuos || !previuos.length) return null;
    return [...previuos, Array(amount)].slice(
      0,
      amount - 1
    ) as BookingPassenger[];
  }
}
