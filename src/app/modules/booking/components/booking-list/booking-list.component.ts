import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { bookingFeature } from 'src/app/redux/booking/booking.reducer';
import { BookingActions } from 'src/app/redux/booking/booking.actions';
import SwiperCore, { Navigation, Swiper, SwiperOptions } from 'swiper';
import { BookingFlightVariant } from 'src/app/redux/booking/booking.state';
import { tap } from 'rxjs';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
})
export class BookingListComponent implements OnInit {
  @Output() completed = new EventEmitter<boolean>();

  config1: SwiperOptions = {
    navigation: {
      prevEl: '.nav__forward--prev',
      nextEl: '.nav__forward--next',
    },
    uniqueNavElements: true,
    slidesPerView: 5,
    initialSlide: 2,
    centeredSlides: true,
    loop: false,
    speed: 500,
    slideToClickedSlide: true,
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
    centerInsufficientSlides: true,
  };

  config2: SwiperOptions = {
    ...this.config1,
    navigation: {
      prevEl: '.nav__return--prev',
      nextEl: '.nav__return--next',
    },
  };

  flyToIndex: number | null = null;
  flyBackIndex: number | null = null;

  flyToData$ = this.store.select(bookingFeature.selectFlyToData);

  flyBackData$ = this.store.select(bookingFeature.selectFlyBackData);

  constructor(public store: Store) {}

  ngOnInit() {
    SwiperCore.use([Navigation]);
    this.store.dispatch(BookingActions.getVariants());
    this.flyToData$.pipe(
      tap((data) => {
        this.config1.initialSlide =
          data.variants && data.chosenVariant
            ? data.variants?.indexOf(data.chosenVariant)
            : undefined;
      })
    );
    this.flyBackData$.pipe(
      tap((data) => {
        this.config2.initialSlide =
          data.variants && data.chosenVariant
            ? data.variants?.indexOf(data.chosenVariant)
            : undefined;
      })
    );
  }

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
    console.log('switch ', type, 'to ', variant);

    this.setActiveCard(type, variant);
  }

  setActiveCard(type: 'forward' | 'backward', variant: BookingFlightVariant) {
    this.store.dispatch(
      BookingActions[
        type === 'forward' ? 'setChosenForward' : 'setChosenBackward'
      ]({ variant })
    );
  }

  onConfirmToggle(type: 'flyTo' | 'flyBack') {
    if (!type) return;
    this.store.dispatch(
      BookingActions[
        type === 'flyTo' ? 'toggleFlytoConfirmed' : 'toggleFlybackConfirmed'
      ]()
    );
  }

  setCompleted() {
    this.completed.emit(true);
  }
}
