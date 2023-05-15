import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { bookingFeature } from 'src/app/redux/booking/booking.reducer';
import { BookingActions } from 'src/app/redux/booking/booking.actions';
import SwiperCore, { Navigation, Swiper, SwiperOptions } from 'swiper';

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
    // initialSlide: 2,
    centeredSlides: true,
    loop: false,
    slideToClickedSlide: true,

    // centeredSlidesBounds removes gaps on the left and right when centeredSlides is true, but it probably won't be needed because there will be +2 out of range non-clickable dates on the left and +2 out of range non-clickable dates on the right, so there'll be no gaps
    // centeredSlidesBounds: true,

    // keyboard: {
    //   enabled: true
    // },

    // breakpoints: {
    //   768: {
    //     slidesPerView: 3,
    //   }
    //   // and so on...
    // }

    // irrelevant properties below
    // centerInsufficientSlides: true,
    // slidesPerGroup: 3,
    // loopFillGroupWithBlank: true,
  };

  flyBackData$ = this.store.select(bookingFeature.selectFlyBackData);
  flyToData$ = this.store.select(bookingFeature.selectFlyToData);

  constructor(public store: Store) {}

  ngOnInit() {
    SwiperCore.use([Navigation]);
    this.store.dispatch(BookingActions.getVariants());
  }

  // onSwiper([swiper]: Event) {
  //   console.log(swiper);
  // }

  onSecondSliderSlideChange(event: [swiper: Swiper]) {
    console.log('onSecondSliderSlideChange', event);
  }

  onSecondSliderActiveIndexChange(event: [swiper: Swiper]) {
    console.log('onSecondSliderActiveIndexChange', event);
    const [slider] = event;
    const activeSlideIndex = slider.activeIndex;
    console.log('activeSlideIndex', activeSlideIndex);
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
