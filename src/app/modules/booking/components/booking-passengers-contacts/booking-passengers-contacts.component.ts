import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { CoreService, Country } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-booking-passengers-contacts',
  templateUrl: './booking-passengers-contacts.component.html',
})
export class BookingPassengersContactsComponent implements OnInit {
  countryControl = new FormControl('');

  selectedCountry: Country | null = null;

  filteredCountries$: Observable<Country[]> = of<Country[]>([]);

  constructor(private coreService: CoreService) {}

  ngOnInit() {
    this.filteredCountries$ = this.countryControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        return this.coreService.getCountries(searchTerm);
      })
    );
  }

  onCountrySelection(country: Country) {
    this.selectedCountry = country;
  }

  onCountryInput() {
    this.selectedCountry = null;
  }
}
