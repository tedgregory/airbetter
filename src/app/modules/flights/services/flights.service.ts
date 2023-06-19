import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { LocationOption } from '../models/flights.interface';
import { ConfigService } from 'src/app/core/config/config.service';

@Injectable()
export class FlightsService {
  locationSearchBaseUrl = '';

  constructor(private http: HttpClient, private config: ConfigService) {
    this.locationSearchBaseUrl = `
    ${this.config.getConfig().ApiUrl['base']}${
      this.config.getConfig().ApiUrl['airport']
    }`;
  }

  getLocations(term?: string | null) {
    // if (!term) return of<LocationOption[]>([]);

    const searchParams = {
      q: term || '',
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
