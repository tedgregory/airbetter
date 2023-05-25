import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { SearchActions } from './search.actions';
import { PassengersActions } from '../passengers/passengers.actions';
import { BookingActions } from '../booking/booking.actions';
import { BookingPassenger } from '../passengers/passengers.state';

@Injectable() // how else to scope it?
export class SearchEffects {
  constructor(private readonly actions$: Actions) {}

  private setSearchData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchActions.setFlightSearchData),
      map((params) => {
        const paramPassengers = params.data.passengers;
        return PassengersActions.updateQuantities({ count: paramPassengers });
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
