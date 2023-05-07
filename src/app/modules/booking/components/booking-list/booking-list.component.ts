import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { bookingFeature } from 'src/app/redux/booking/booking.reducer';
import { BookingActions } from 'src/app/redux/booking/booking.actions';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
})
export class BookingListComponent implements OnInit {
  flyBackData$ = this.store.select(bookingFeature.selectFlyBackData);
  flyToData$ = this.store.select(bookingFeature.selectFlyToData);

  constructor(public store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(BookingActions.getVariants());
  }

  onSwitchCurrentCard(id: string | null) {
    console.log('emitted card token ', id);
    //this.store.dispatch(SearchActions.setDate(clickedOne))
  }
  onConfirmToggle(type: 'flyTo' | 'flyBack') {
    if (!type) return;
    this.store.dispatch(
      BookingActions[
        type === 'flyTo' ? 'toggleFlytoConfirmed' : 'toggleFlybackConfirmed'
      ]()
    );
  }

  handleForward() {
    //this.store.dispatch(SearchActions.incrementDate())
  }
  handleBackward() {
    //this.store.dispatch(SearchActions.decrementDate())
  }
}
