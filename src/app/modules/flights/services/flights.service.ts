import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { LocationOption } from '../models/flights.interface';

@Injectable()
export class FlightsService {
  locationSearchBaseUrl = 'https://api.air-ways.online/search/airport';

  constructor(private http: HttpClient) {}

  getLocations(term?: string | null) {
    // if (!term) return of<LocationOption[]>([]);
    let searchTerm = '';

    if (term) searchTerm = term;

    const searchParams = {
      q: searchTerm,
    };

    return this.http
      .get<LocationOption[]>(this.locationSearchBaseUrl, {
        params: searchParams,
      })
      .pipe(
        // map((response: LocationOption[]) => [...response] || []),
        catchError(() => {
          return of<LocationOption[]>([]);
        })
      );
  }
}
