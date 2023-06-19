import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { PassengersActions } from './passengers.actions';
import { catchError, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { passengersFeature } from './passengers.reducer';
import { EPassengerType } from '../common/common.models';
import { BookingPassenger } from './passengers.state';
import { BookingActions } from '../booking/booking.actions';

@Injectable()
export class PassengersEffects {
  constructor(private actions$: Actions, private store: Store) {}
  setFullData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PassengersActions.setFullPassengersDetails),
      switchMap(({ data }) => {
        return of(
          PassengersActions.setPassengers({
            adults: data.adults,
            children: data.children,
            infants: data.infants,
          }),
          PassengersActions.setContactDetails({
            contactDetails: data.contactDetails,
          })
        );
      }),
      catchError((error) => of(PassengersActions.setError({ error })))
    );
  });

  updateQuantities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PassengersActions.updateQuantities),
      concatLatestFrom(() =>
        this.store.select(passengersFeature.selectPassengersState)
      ),
      switchMap(([{ count }, passStored]) => {
        return of(
          PassengersActions.setPassengers({
            adults: this.mergePassengers(
              passStored.adults,
              count[EPassengerType.Adult]
            ),
            children: this.mergePassengers(
              passStored.children,
              count[EPassengerType.Child]
            ),
            infants: this.mergePassengers(
              passStored.infants as BookingPassenger[],
              count[EPassengerType.Infant]
            ) as BookingPassenger[],
          })
        );
      }),
      catchError((error) => of(PassengersActions.setError({ error })))
    );
  });

  dropPassengersStep$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PassengersActions.updateQuantities),
      switchMap(() => {
        return of(
          BookingActions.setStepCompleted({
            step: 'passengers',
            status: false,
          }),
          BookingActions.setStepCompleted({ step: 'review', status: false })
        );
      }),
      catchError((error) => of(PassengersActions.setError({ error })))
    );
  });

  private mergePassengers(previous: BookingPassenger[] | null, amount: number) {
    if (!previous || !previous.length)
      return amount !== 0 ? Array(amount) : null;
    const result =
      amount !== 0 ? [...previous, ...Array(amount)].slice(0, amount) : null;
    return result;
  }
}
