import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { BookingService } from 'src/app/modules/booking/services/booking.service';
import { BookingActions } from '../actions/booking.actions';
import { BookingFlightVariant } from '../models/booking.state';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { selectBookingBasic } from '../selectors/booking.selectors';

@Injectable({ providedIn: 'root' }) // how else to scope it?
export class BookingEffects {
  constructor(
    private readonly actions$: Actions,
    private store: Store,
    private apiService: BookingService
  ) {}

  private getVariants$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookingActions.getVariants),
      concatLatestFrom(() => this.store.select(selectBookingBasic)),
      switchMap(([_, params]) => {
        return this.apiService.getBookingData(params).pipe(
          map((variants) => {
            return BookingActions.getVariantsSuccess({
              variants: variants as BookingFlightVariant[],
            });
          })
        );
      })
    );
  });
}
