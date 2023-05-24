import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PassengersActions } from './passengers.actions';
import { catchError, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PassengersEffects {
  constructor(private actions$: Actions) {}
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
}
