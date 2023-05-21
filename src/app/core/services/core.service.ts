import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, debounceTime, fromEvent, map, of, tap } from 'rxjs';

export interface Country {
  name: string;
  dialCode: string;
  code: string;
}

export interface Citizenship {
  numCode: string;
  alpha2Code: string;
  alpha3Code: string;
  enShortName: string;
  nationality: string;
}

@Injectable()
export class CoreService {
  constructor(private http: HttpClient) {}

  onWindowResize(callback: (isResizing: boolean) => void) {
    const resize = fromEvent(window, 'resize');
    let isResizing = false;
    return resize
      .pipe(
        tap(() => {
          isResizing = true;
          callback(isResizing);
        }),
        debounceTime(200),
        tap(() => {
          isResizing = false;
          callback(isResizing);
        })
      )
      .subscribe();
  }

  getCountries(term?: string | null) {
    const searchTerm = term ? term.toLocaleLowerCase() : '';

    return this.http.get<Country[]>('assets/data/countries.json').pipe(
      map((countries) =>
        countries.filter((country) =>
          `${country.name} (${country.dialCode})`
            .toLocaleLowerCase()
            .includes(searchTerm)
        )
      ),
      catchError(() => {
        return of<Country[]>([]);
      })
    );
  }

  getCitizenships(term?: string | null) {
    const searchTerm = term ? term.toLocaleLowerCase() : '';

    return this.http.get<Citizenship[]>('assets/data/citizenship.json').pipe(
      map((citizenships) =>
        citizenships.filter((citizenship) =>
          `${citizenship.nationality} (${citizenship.alpha2Code})`
            .toLocaleLowerCase()
            .includes(searchTerm)
        )
      ),
      catchError(() => {
        return of<Citizenship[]>([]);
      })
    );
  }
}
