import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import moment from 'moment';
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
  take,
  tap,
} from 'rxjs';
import { CountsOptions } from 'src/app/modules/flights/components/select-passengers/select-passengers.component';
import { LocationOption } from 'src/app/modules/flights/models/flights.interface';
import { FlightsService } from 'src/app/modules/flights/services/flights.service';
import { DateFormats, PassengerType } from 'src/app/redux/common/common.models';
import { PassengersActions } from 'src/app/redux/passengers/passengers.actions';
import { SearchActions } from 'src/app/redux/search/search.actions';
import CustomSearchSelectors from 'src/app/redux/search/search.selectors';

@Component({
  selector: 'app-booking-info-panel',
  templateUrl: './booking-info-panel.component.html',
})
export class BookingInfoPanelComponent implements OnInit {
  editMode = false;

  fromControl = new FormControl('', [Validators.required]);
  toControl = new FormControl('', [Validators.required]);
  range = new FormGroup({
    start: new FormControl<Date | null>(null, [Validators.required]),
    end: new FormControl<Date | null>(null, [Validators.required]),
  });

  filteredFromOptions$: Observable<LocationOption[]> = of<LocationOption[]>([]);

  filteredToOptions$: Observable<LocationOption[]> = of<LocationOption[]>([]);

  selectedFromOption: LocationOption | null = null;

  selectedToOption: LocationOption | null = null;

  savedStoreValues$ = this.store.select(
    CustomSearchSelectors.selectSearchBasic
  );

  // startDate = new Date();
  minDate: Date = new Date();
  // maxDate: Date;

  // Set the maximum to December 31st a year in the future.
  // const currentYear = new Date().getFullYear();
  // this.minDate = new Date(currentYear - 20, 0, 1);
  // this.maxDate = new Date(currentYear + 1, 11, 31);

  startDatePicker = new Subject<MatDatepickerInputEvent<Date | null>>();
  endDatePicker = new Subject<MatDatepickerInputEvent<Date | null>>();
  dateFormat = DateFormats.YMD;

  isLoading = false;

  passengerCounts: CountsOptions = {
    [PassengerType.Adult]: 0,
    [PassengerType.Child]: 0,
    [PassengerType.Infant]: 0,
  };

  constructor(private flightsService: FlightsService, private store: Store) {}

  toggleEditPanel() {
    this.editMode = !this.editMode;
  }

  get isValidLocationInput() {
    return !!this.selectedFromOption && !!this.selectedToOption;
  }

  ngOnInit() {
    this.savedStoreValues$
      .pipe(
        take(1),
        tap((search) => {
          this.fromControl.setValue(search.flyFrom.title);
          this.toControl.setValue(search.flyTo.title);
          this.range.setValue({
            start: search.dateLeave
              ? moment(search.dateLeave, search.dateFormat).toDate()
              : null,
            end: search.dateReturn
              ? moment(search.dateReturn, search.dateFormat).toDate()
              : null,
          });
          this.passengerCounts = search.passengersCount;
          this.dateFormat = search.dateFormat;
        })
      )
      .subscribe();

    combineLatest([this.startDatePicker, this.endDatePicker])
      .pipe(
        map(([a$, b$]) => ({
          start: a$.value,
          end: b$.value,
        }))
      )
      .subscribe((data) => {
        if (data.start && data.end && !this.range.errors) {
          this.store.dispatch(
            SearchActions.setDatesRange({
              dateLeave: moment(data.start).format(this.dateFormat),
              dateReturn: moment(data.end).format(this.dateFormat),
            })
          );
        }
      });

    this.filteredFromOptions$ =
      this.fromControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        // tap((searchTerm) => console.log(searchTerm)),
        switchMap((value) => {
          return this.flightsService.getLocations(value);
        })
      ) || of<LocationOption[]>([]);

    this.filteredToOptions$ =
      this.toControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        // tap((searchTerm) => console.log(searchTerm)),
        switchMap((value) => {
          return this.flightsService.getLocations(value);
        })
      ) || of<LocationOption[]>([]);
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
    this.fromControl.setErrors({ incorrect: true });
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
    this.toControl.setErrors({ incorrect: true });
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
