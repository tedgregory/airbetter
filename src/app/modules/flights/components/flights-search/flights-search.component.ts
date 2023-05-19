import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Observable,
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
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

@Component({
  selector: 'app-flights-search',
  templateUrl: './flights-search.component.html',
})
export class FlightsSearchComponent implements OnInit {
  @HostBinding('class') class = 'flights-search';

  selectedTripType: string | undefined;

  fromControl = new FormControl('');

  toControl = new FormControl('');

  filteredFromOptions$: Observable<LocationOption[]> = of<LocationOption[]>([]);

  filteredToOptions$: Observable<LocationOption[]> = of<LocationOption[]>([]);

  selectedFromOption: LocationOption | null = null;

  selectedToOption: LocationOption | null = null;

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

  constructor(private flightsService: FlightsService) {}

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

    const dateChange$ = combineLatest([
      this.startDatePicker,
      this.endDatePicker,
    ]).pipe(
      map(([a$, b$]) => ({
        start: a$,
        end: b$,
      }))
    );

    dateChange$.subscribe((data) => {
      if (data.start.value && data.end.value) {
        // console.log('User has picked both dates', data.start.value, data.end.value);
      }
    });
  }

  onTripTypeChange(event: MatRadioChange) {
    this.selectedTripType = event.value;
  }

  onLocationSwitchClick() {
    [this.selectedFromOption, this.selectedToOption] = [
      this.selectedToOption,
      this.selectedFromOption,
    ];

    const [toValue, fromValue] = [this.fromControl.value, this.toControl.value];
    this.fromControl.setValue(fromValue);
    this.toControl.setValue(toValue);
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
}
