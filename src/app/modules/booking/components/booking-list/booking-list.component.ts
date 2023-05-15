import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { bookingFeature } from 'src/app/redux/booking/booking.reducer';
import { BookingActions } from 'src/app/redux/booking/booking.actions';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
})
export class BookingListComponent implements OnInit {
  @ViewChild('swiper')
  swiperEl: ElementRef | undefined;

  config: SwiperOptions = {
    navigation: { prevEl: '.flight__nav--prev', nextEl: '.flight__nav--next' },
    slidesPerView: 3,
    initialSlide: 2,
    //centeredSlides: true,
  };

  flyBackData$ = this.store.select(bookingFeature.selectFlyBackData);
  flyToData$ = this.store.select(bookingFeature.selectFlyToData);

  constructor(public store: Store) {}

  ngOnInit(): void {
    SwiperCore.use([Navigation]);
    this.store.dispatch(BookingActions.getVariants());
  }

  // onSwiper([swiper]: Event) {
  //   console.log(swiper);
  // }

  onSlideChange() {
    console.log('Slide change');
  }

  onSwitchCurrentCard(id: string | null) {
    console.log('emitted flight ID:', id);
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
