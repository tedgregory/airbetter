import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { bookingFeature } from 'src/app/redux/booking/booking.reducer';
import { BookingActions } from 'src/app/redux/booking/booking.actions';
import SwiperCore, { Navigation, Swiper, SwiperOptions } from 'swiper';
import { Subscription, combineLatest, of, switchMap } from 'rxjs';
import { searchFeature } from 'src/app/redux/search/search.reducer';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
})
export class BookingListComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() completed = new EventEmitter<[string, boolean]>();

  config1: SwiperOptions = {
    navigation: {
      prevEl: '.nav__forward--prev',
      nextEl: '.nav__forward--next',
    },
    uniqueNavElements: true,
    slidesPerView: 1,
    initialSlide: undefined,
    centeredSlides: true,
    loop: false,
    speed: 300,
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

  subscriptions: Subscription[] = [];

  flyToData$ = this.store.select(bookingFeature.selectFlyToData);

  flyBackData$ = this.store.select(bookingFeature.selectFlyBackData);

  flyToChosen$ = this.store.select(bookingFeature.selectChosenForwardIndex);
  flyBackChosen$ = this.store.select(bookingFeature.selectChosenBackwardIndex);

  selectedCurrency$ = this.store.select(searchFeature.selectCurrency);

  loadingStatus$ = this.store
    .select(bookingFeature.selectStatus)
    .pipe(switchMap((status) => of(status.valueOf())));

  constructor(public store: Store) {
    this.subscriptions.push(
      this.flyToChosen$.subscribe((index) => {
        this.config1.initialSlide = index;
      })
    );
    this.subscriptions.push(
      this.flyBackChosen$.subscribe((index) => {
        this.config2.initialSlide = index;
      })
    );
  }

  ngOnInit() {
    SwiperCore.use([Navigation]);
    this.store.dispatch(BookingActions.getVariants());
    this.subscriptions.push(
      combineLatest([this.flyToData$, this.flyBackData$]).subscribe(
        ([forward, backward]) => {
          if (forward.confirmed && (backward.confirmed || !backward.variants)) {
            this.setCompleted();
          } else {
            this.setInvalid();
          }
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (sub) => sub instanceof Subscription && sub.unsubscribe()
    );
  }

  ngAfterViewInit(): void {
    this.setInvalid();
  }

  onSliderSlideChange(type: 'forward' | 'backward', event: [swiper: Swiper]) {
    if (!event || !event[0]) {
      return;
    }
    this.setActiveCard(type, event[0].activeIndex);
  }

  setActiveCard(type: 'forward' | 'backward', index: number) {
    this.store.dispatch(
      BookingActions[
        type === 'forward' ? 'setChosenForward' : 'setChosenBackward'
      ]({ index })
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
    this.completed.emit(['flights', true]);
  }
  setInvalid() {
    this.completed.emit(['flights', false]);
  }
}
