import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/config/config.service';
import { convertApiResponseToVariant } from 'src/app/redux/api-converter';
import { catchError, map, of } from 'rxjs';
import { SearchState } from 'src/app/redux/search/search.state';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/booking.interface';
import moment from 'moment';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private config: ConfigService, private http: HttpClient) {}

  getBookingData(params: SearchState) {
    const { base, search } = this.config.getConfig().ApiURL;
    const body = {
      fromKey: params.flyFrom,
      toKey: params.flyTo,
      forwardDate: moment(params.dateLeave, params.dateFormat).utc(),
      backDate: moment(params.dateReturn, params.dateFormat).utc(),
    };
    return this.http
      .post(`${base}${search}`, body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        // tap(console.log),
        catchError((error) => of(new Error(error.message))),
        map((data) => convertApiResponseToVariant(data as ApiResponse))
      );
  }
}
