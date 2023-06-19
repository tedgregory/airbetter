import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { CountsOptions } from '../select-passengers/select-passengers.component';
import { FlightsService } from '../../services/flights.service';
import { LocationOption } from '../../models/flights.interface';
import { MatRadioChange } from '@angular/material/radio';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { NavigationPath } from 'src/app/core/navigation/models/navigation.interface';
import { ISearchData } from 'src/app/redux/search/search.state';
import { SearchActions } from 'src/app/redux/search/search.actions';
import { EPassengerType } from 'src/app/redux/common/common.models';

@Component({
  selector: 'app-flights-search',
  templateUrl: './flights-search.component.html',
})
export class FlightsSearchComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'flights-search';

  flightsSearchForm = new FormGroup({
    range: new FormGroup({
      start: new FormControl<Date | null>(null, [Validators.required]),
      end: new FormControl<Date | null>(null, [Validators.required]),
    }),
    fromControl: new FormControl('', [Validators.required]),
    toControl: new FormControl('', [Validators.required]),
    isReturnControl: new FormControl(false),
  });

  filteredFromOptions$: Observable<LocationOption[]> = of<LocationOption[]>([]);

  filteredToOptions$: Observable<LocationOption[]> = of<LocationOption[]>([]);

  selectedFromOption: LocationOption | null = null;

  selectedToOption: LocationOption | null = null;

  selectedIsReturn = false;

  minDate: Date = new Date();
  maxDate: Date = new Date(
    new Date().setFullYear(this.minDate.getFullYear() + 1)
  );

  startDatePicker = new Subject<MatDatepickerInputEvent<Date | null>>();

  endDatePicker = new Subject<MatDatepickerInputEvent<Date | null>>();

  passengerCounts: CountsOptions = {
    [EPassengerType.Adult]: 0,
    [EPassengerType.Child]: 0,
    [EPassengerType.Infant]: 0,
  };

  passengersError$ = new BehaviorSubject(false);

  subscriptions: Subscription[] = [];

  constructor(
    private flightsService: FlightsService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.filteredFromOptions$ =
      this.flightsSearchForm?.get('fromControl')?.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        // tap((searchTerm) => console.log(searchTerm)),
        switchMap((searchTerm) => {
          return this.flightsService.getLocations(searchTerm);
        })
      ) || of<LocationOption[]>([]);

    this.filteredToOptions$ =
      this.flightsSearchForm?.get('toControl')?.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        // tap((searchTerm) => console.log(searchTerm)),
        switchMap((searchTerm) => {
          return this.flightsService.getLocations(searchTerm);
        })
      ) || of<LocationOption[]>([]);

    // this.subscriptions.push(
    //   this.store
    //     .select(passengersFeature.selectPassengersState)
    //     .pipe(
    //       tap((passengers) => {
    //         this.passengerCounts = {
    //           [PassengerType.Adult]: passengers.adults?.length || 0,
    //           [PassengerType.Child]: passengers.children?.length || 0,
    //           [PassengerType.Infant]: passengers.infants?.length || 0,
    //         };
    //       })
    //     )
    //     .subscribe()
    // );
    // const dateChange$ = combineLatest([
    //   this.startDatePicker,
    //   this.endDatePicker,
    // ]).pipe(
    //   map(([a$, b$]) => ({
    //     start: a$,
    //     end: b$,
    //   }))
    // );

    // dateChange$.subscribe((data) => {
    //   if (data.start.value && data.end.value) {
    //     // console.log('User has picked both dates', data.start.value, data.end.value);
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (sub) => sub instanceof Subscription && sub.unsubscribe()
    );
  }

  onTripTypeChange(event: MatRadioChange) {
    this.selectedIsReturn = event.value === 'round-trip';
  }

  onLocationSwitchClick() {
    [this.selectedFromOption, this.selectedToOption] = [
      this.selectedToOption,
      this.selectedFromOption,
    ];

    const [toValue, fromValue] = [
      this.flightsSearchForm?.get('fromControl')?.value || null,
      this.flightsSearchForm?.get('toControl')?.value || null,
    ];
    this.flightsSearchForm?.get('fromControl')?.setValue(fromValue);
    this.flightsSearchForm?.get('toControl')?.setValue(toValue);
  }

  // location: LocationOption, event: MatOptionSelectionChange
  onFromSelection(location: LocationOption) {
    this.selectedFromOption = location;
  }

  onFromInput() {
    this.selectedFromOption = null;
    this.flightsSearchForm.get('fromControl')?.setErrors({ incorrect: true });
  }

  // location: LocationOption, event: MatOptionSelectionChange
  onToSelection(location: LocationOption) {
    this.selectedToOption = location;
  }

  onToInput() {
    this.selectedToOption = null;
    this.flightsSearchForm.get('toControl')?.setErrors({ incorrect: true });
  }

  onPassengerCountsChange(counts: CountsOptions) {
    this.passengerCounts = counts;
  }

  getPassengersQuantity(): number {
    return Object.values(this.passengerCounts).reduce((r, i) => r + i, 0) || 0;
  }

  validatePassengers() {
    this.passengersError$.next(false);
    this.passengersError$.next(
      (this.getPassengersQuantity() > 0 &&
        this.passengerCounts[EPassengerType.Adult] === 0) ||
        this.getPassengersQuantity() === 0
    );
  }

  onFormSubmit() {
    this.validatePassengers();
    if (this.passengersError$.value) {
      return;
    }
    const { value: formValues } = this.flightsSearchForm;
    const searchData: ISearchData = {
      dateLeave: formValues.range?.start?.toISOString() || null,
      dateReturn: formValues.range?.end?.toISOString() || null,
      isReturn: this.selectedIsReturn,
      flyFrom: {
        iata: this.selectedFromOption?.key || '',
        title: this.selectedFromOption?.name || '',
      },
      flyTo: {
        iata: this.selectedToOption?.key || '',
        title: this.selectedToOption?.name || '',
      },
      passengers: this.passengerCounts,
    };
    this.store.dispatch(
      SearchActions.setFlightSearchData({ data: searchData })
    );

    this.router.navigate([`${NavigationPath.Booking}`]);
  }
}
