import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { bookingFeature } from 'src/app/redux/booking/booking.reducer';
import { BookingActions } from 'src/app/redux/booking/booking.actions';
import SwiperCore, { Navigation, Swiper, SwiperOptions } from 'swiper';
import { BookingFlightVariant } from 'src/app/redux/booking/booking.state';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
})
export class BookingListComponent implements OnInit {
  config1: SwiperOptions = {
    navigation: {
      prevEl: '.nav__forward--prev',
      nextEl: '.nav__forward--next',
    },
    slidesPerView: 5,
    initialSlide: 2,
    centeredSlides: true,
    loop: false,
    slideToClickedSlide: true,

    // centeredSlidesBounds removes gaps on the left and right when centeredSlides is true, but it probably won't be needed because there will be +2 out of range non-clickable dates on the left and +2 out of range non-clickable dates on the right, so there'll be no gaps
    // centeredSlidesBounds: true,

    // keyboard: {
    //   enabled: true
    // },

    breakpoints: {
      1200: {
        slidesPerView: 5,
      },
      768: {
        slidesPerView: 3,
      },
      480: {
        slidesPerView: 1,
      },
    },

    // irrelevant properties below
    centerInsufficientSlides: true,
    // slidesPerGroup: 3,
    // loopFillGroupWithBlank: true,
  };

  config2: SwiperOptions = {
    ...this.config1,
    navigation: {
      prevEl: '.nav__return--prev',
      nextEl: '.nav__return--next',
    },
  };

  flyBackData$ = this.store.select(bookingFeature.selectFlyBackData);
  flyToData$ = this.store.select(bookingFeature.selectFlyToData);

  constructor(public store: Store) {}

  ngOnInit() {
    SwiperCore.use([Navigation]);
    this.store.dispatch(BookingActions.getVariants());
  }

  // onSwiper(event: [swiper: Swiper]) {
  //   console.log(event);
  // }

  onSliderSlideChange(type: 'forward' | 'backward', event: [swiper: Swiper]) {
    let variant: BookingFlightVariant | null = null;
    switch (type) {
      case 'forward':
        this.flyToData$
          .subscribe((data) => {
            variant = data.variants?.[event[0].activeIndex] || null;
          })
          .unsubscribe(); // is it ok?
        break;
      case 'backward':
        this.flyBackData$
          .subscribe((data) => {
            variant = data.variants?.[event[0].activeIndex] || null;
          })
          .unsubscribe();
    }
    if (!variant) {
      return;
    }
    this.setActiveCard(type, variant);
  }

  setActiveCard(type: 'forward' | 'backward', variant: BookingFlightVariant) {
    // this.store.dispatch(
    //   BookingActions[
    //     type === 'forward' ? 'setChosenForward' : 'setChosenBackward'
    //   ]({ variant })
    // );
    console.log(type, ' ', variant);
  }

  onSliderActiveIndexChange(
    type: 'forward' | 'backward',
    event: [swiper: Swiper]
  ) {
    console.log('onSecondSliderActiveIndexChange', event[0].activeIndex);
    const [slider] = event;
    const activeSlideIndex = slider.activeIndex;
    console.log('activeSlideIndex', activeSlideIndex);
  }

  onSwitchCurrentCard(id: string | null) {
    console.log('emitted flight ID:', id);
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
