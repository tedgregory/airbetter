import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { BookingService } from 'src/app/modules/booking/services/booking.service';
import { BookingActions } from './booking.actions';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import CustomSearchSelectors from '../search/search.selectors';

@Injectable() // how else to scope it?
export class BookingEffects {
  constructor(
    private readonly actions$: Actions,
    private store: Store,
    private apiService: BookingService
  ) {}

  private getVariants$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookingActions.getVariants),
      concatLatestFrom(() =>
        this.store.select(CustomSearchSelectors.selectSearchBasic)
      ),
      switchMap(([, params]) => {
        return this.apiService.getBookingData(params).pipe(
          map((result) => {
            return BookingActions.getVariantsSuccess({
              bookingData: result,
            });
          }),
          catchError((e) =>
            of(BookingActions.getVariantsError({ error: e as Error }))
          )
        );
      })
    );
  });
}
