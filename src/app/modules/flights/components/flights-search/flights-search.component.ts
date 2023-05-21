import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
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
import { Router } from '@angular/router';
import { NavigationPath } from 'src/app/core/navigation/models/navigation.interface';
import { createDateValidator } from '../../validators/date.validator';
import { ISearchData } from 'src/app/redux/search/search.state';
import { SearchActions } from 'src/app/redux/search/search.actions';

@Component({
  selector: 'app-flights-search',
  templateUrl: './flights-search.component.html',
})
export class FlightsSearchComponent implements OnInit {
  @HostBinding('class') class = 'flights-search';

  flightsSearchForm = new FormGroup({
    range: new FormGroup({
      start: new FormControl<Date | null>(null, [
        Validators.required,
        createDateValidator(),
      ]),
      end: new FormControl<Date | null>(null, [
        Validators.required,
        createDateValidator(),
      ]),
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

  // startDate = new Date();
  minDate: Date = new Date();
  // maxDate: Date;

  // Set the maximum to December 31st a year in the future.
  // const currentYear = new Date().getFullYear();
  // this.minDate = new Date(currentYear - 20, 0, 1);
  // this.maxDate = new Date(currentYear + 1, 11, 31);

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
  }

  // location: LocationOption, event: MatOptionSelectionChange
  onToSelection(location: LocationOption) {
    this.selectedToOption = location;
  }

  onToInput() {
    this.selectedToOption = null;
  }

  onPassengerCountsChange(counts: CountsOptions) {
    this.passengerCounts = { ...counts };
  }

  onFormSubmit() {
    const { value: fromvalue } = this.flightsSearchForm;
    const searchData: ISearchData = {
      dateLeave: fromvalue.range?.start?.toISOString() || null,
      dateReturn: fromvalue.range?.end?.toISOString() || null,
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
