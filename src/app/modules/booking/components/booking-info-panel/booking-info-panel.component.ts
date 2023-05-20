import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
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
} from 'src/app/modules/flights/components/select-passengers/select-passengers.component';
import { LocationOption } from 'src/app/modules/flights/models/flights.interface';
import { FlightsService } from 'src/app/modules/flights/services/flights.service';
import { PassengersActions } from 'src/app/redux/passengers/passengers.actions';
import { SearchActions } from 'src/app/redux/search/search.actions';
import { searchFeature } from 'src/app/redux/search/search.reducer';

@Component({
  selector: 'app-booking-info-panel',
  templateUrl: './booking-info-panel.component.html',
})
export class BookingInfoPanelComponent implements OnInit {
  editMode = false;

  fromControl = new FormControl('');

  toControl = new FormControl('');

  filteredFromOptions$: Observable<LocationOption[]> = of<LocationOption[]>([]);

  filteredToOptions$: Observable<LocationOption[]> = of<LocationOption[]>([]);

  selectedFromOption: LocationOption | null = null;

  selectedToOption: LocationOption | null = null;

  savedStoreValues$ = this.store.select(searchFeature.selectSearchState);

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

  constructor(private flightsService: FlightsService, private store: Store) {}

  toggleEditPanel() {
    this.editMode = !this.editMode;
  }

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

  // location: LocationOption, event: MatOptionSelectionChange
  onFromSelection(location: LocationOption) {
    this.selectedFromOption = location;
    this.store.dispatch(
      SearchActions.setFlyFrom({
        flyFrom: { iata: location.key, title: location.name },
      })
    );
  }

  onFromInput() {
    this.selectedFromOption = null;
  }

  // location: LocationOption, event: MatOptionSelectionChange
  onToSelection(location: LocationOption) {
    this.selectedToOption = location;
    this.store.dispatch(
      SearchActions.setFlyTo({
        flyTo: { iata: location.key, title: location.name },
      })
    );
  }

  onToInput() {
    this.selectedToOption = null;
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

  getPassengersQuantity(): number {
    return Object.values(this.passengerCounts).reduce((r, i) => r + i, 0) || 0;
  }
}
