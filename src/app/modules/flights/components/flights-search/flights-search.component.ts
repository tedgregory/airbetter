import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import {
  CountsOptions,
  PassengerType,
} from '../select-passengers/select-passengers.component';
import { FlightsService } from '../../services/flights.service';
import { LocationOption } from '../../models/flights.interface';
import { MatRadioChange } from '@angular/material/radio';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { PassengersActions } from 'src/app/redux/passengers/passengers.actions';
import { SearchActions } from 'src/app/redux/search/search.actions';
import { searchFeature } from 'src/app/redux/search/search.reducer';
import moment from 'moment';
import { Router } from '@angular/router';
import { NavigationPath } from 'src/app/core/navigation/models/navigation.interface';

@Component({
  selector: 'app-flights-search',
  templateUrl: './flights-search.component.html',
})
export class FlightsSearchComponent implements OnInit {
  @HostBinding('class') class = 'flights-search';

  savedSearchValues$ = this.store.select(searchFeature.selectSearchState);

  fromControl = new FormControl('');

  toControl = new FormControl('');

  filteredFromOptions$: Observable<LocationOption[]> = of<LocationOption[]>([]);

  filteredToOptions$: Observable<LocationOption[]> = of<LocationOption[]>([]);

  selectedFromOption$ = new BehaviorSubject<LocationOption | null>(null);

  selectedToOption$ = new BehaviorSubject<LocationOption | null>(null);

  // startDate = new Date();
  minDate: Date = new Date();
  // maxDate: Date;

  // Set the maximum to December 31st a year in the future.
  // const currentYear = new Date().getFullYear();
  // this.minDate = new Date(currentYear - 20, 0, 1);
  // this.maxDate = new Date(currentYear + 1, 11, 31);

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  startDatePicker = new Subject<MatDatepickerInputEvent<Date | null>>();

  endDatePicker = new Subject<MatDatepickerInputEvent<Date | null>>();

  passengerCounts: CountsOptions = {
    [PassengerType.Adult]: 0,
    [PassengerType.Child]: 0,
    [PassengerType.Infant]: 0,
  };

  constructor(
    private flightsService: FlightsService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.filteredFromOptions$ = this.fromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      // tap((searchTerm) => console.log(searchTerm)),
      switchMap((searchTerm) => {
        return this.flightsService.getLocations(searchTerm);
      })
    );

    this.filteredToOptions$ = this.toControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      // tap((searchTerm) => console.log(searchTerm)),
      switchMap((searchTerm) => {
        return this.flightsService.getLocations(searchTerm);
      })
    );

    this.startDatePicker.subscribe((dateLeave) => {
      this.store.dispatch(
        SearchActions.setDateLeave({
          dateLeave: moment(dateLeave.value).format(),
        })
      );
    });

    this.endDatePicker.subscribe((dateReturn) => {
      this.store.dispatch(
        SearchActions.setDateReturn({
          dateReturn: moment(dateReturn.value).format(),
        })
      );
    });

    this.selectedFromOption$.subscribe((from) => {
      this.store.dispatch(
        SearchActions.setFlyFrom({
          flyFrom: {
            iata: from?.key || '',
            title: from?.name || '',
          },
        })
      );
    });

    this.selectedToOption$.subscribe((to) => {
      this.store.dispatch(
        SearchActions.setFlyTo({
          flyTo: {
            iata: to?.key || '',
            title: to?.name || '',
          },
        })
      );
    });

    this.savedSearchValues$.subscribe((state) => {
      this.range.value.start ||= moment(state.dateLeave).toDate();
      this.range.value.end ||= moment(state.dateReturn).toDate();
    });

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

  onTripTypeChange(event: MatRadioChange) {
    this.store.dispatch(
      SearchActions.setFlightType({ isReturn: event.value === 'round-trip' })
    );
  }

  onLocationSwitchClick() {
    [this.selectedFromOption$, this.selectedToOption$] = [
      this.selectedToOption$,
      this.selectedFromOption$,
    ];

    const [toValue, fromValue] = [this.fromControl.value, this.toControl.value];
    this.fromControl.setValue(fromValue);
    this.toControl.setValue(toValue);
  }

  // location: LocationOption, event: MatOptionSelectionChange
  onFromSelection(location: LocationOption) {
    this.selectedFromOption$.next(location);
  }

  onFromInput() {
    this.selectedFromOption$.next(null);
  }

  // location: LocationOption, event: MatOptionSelectionChange
  onToSelection(location: LocationOption) {
    this.selectedToOption$.next(location);
  }

  onToInput() {
    this.selectedToOption$.next(null);
  }

  onPassengerCountsChange(counts: CountsOptions) {
    this.passengerCounts = { ...counts };
    this.store.dispatch(
      PassengersActions.setPassengers({
        adults: Array(counts[PassengerType.Adult]),
        children: Array(counts[PassengerType.Child]),
        infants: Array(counts[PassengerType.Infant]),
      })
    );
  }

  onFormSubmit() {
    this.router.navigate([`/${NavigationPath.Booking}`]);
  }
}
