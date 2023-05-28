import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserAuthActions } from 'src/app/redux/auth/auth.actions';

@Injectable()
export class UserAuthInitService {
  constructor(private store: Store) {}

  initialize() {
    this.store.dispatch(UserAuthActions.checkAuth());
  }
}
