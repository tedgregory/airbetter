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
import {
  Citizenship,
  CoreService,
  Country,
} from 'src/app/core/services/core.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
})
export class AuthFormComponent implements OnInit {
  isPasswordHidden = true;

  countryControl = new FormControl('');

  citizenshipControl = new FormControl('');

  selectedCountry: Country | null = null;

  selectedCitizenship: Citizenship | null = null;

  filteredCountries$: Observable<Country[]> = of<Country[]>([]);

  filteredCitizenships$: Observable<Citizenship[]> = of<Citizenship[]>([]);

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

    this.filteredCitizenships$ = this.citizenshipControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        return this.coreService.getCitizenships(searchTerm);
      })
    );
  }

  onCountrySelection(country: Country) {
    this.selectedCountry = country;
  }

  onCountryInput() {
    this.selectedCountry = null;
  }

  onCitizenshipSelection(citizenship: Citizenship) {
    this.selectedCitizenship = citizenship;
  }

  onCitizenshipInput() {
    this.selectedCitizenship = null;
  }
}
