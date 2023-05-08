import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { ApiResponse } from '../../models/booking.interface';
// import { BookingVariant } from '../../models/booking.interface';
// import { BookingService } from '../../services/booking.service';
const flightsFW: ApiResponse[] = [
  {
    search_id: '66906068-44b7-b52b-d1f0-48e421497202',
    currency: 'EUR',
    data: [
      {
        id: '126225c34c164c299a05a957_0|126225c34c164c299a05a957_1',
        flyFrom: 'DUS',
        flyTo: 'CDG',
        cityFrom: 'Düsseldorf',
        cityCodeFrom: 'DUS',
        cityTo: 'Paris',
        cityCodeTo: 'PAR',
        countryFrom: {
          code: 'DE',
          name: 'Germany',
        },
        countryTo: {
          code: 'FR',
          name: 'France',
        },
        duration: { total: 4800 },
        price: 364,
        fare: {
          adults: 169.3,
          children: 169.3,
          infants: 25.4,
        },
        bags_price: {
          '1': 85,
        },
        baglimit: {
          hand_height: 35,
          hand_length: 55,
          hand_weight: 12,
          hand_width: 25,
          hold_dimensions_sum: 158,
          hold_height: 52,
          hold_length: 78,
          hold_weight: 23,
          hold_width: 28,
        },
        availability: {
          seats: null,
        },
        airlines: ['AF'],
        route: [
          {
            id: '126225c34c164c299a05a957_0',
            combination_id: '126225c34c164c299a05a957',
            flyFrom: 'DUS',
            flyTo: 'CDG',
            cityFrom: 'Düsseldorf',
            cityCodeFrom: 'DUS',
            cityTo: 'Paris',
            cityCodeTo: 'PAR',
            airline: 'AF',
            flight_no: 1607,
            operating_carrier: 'A5',
            operating_flight_no: '',
            fare_basis: 'RH5UA5LG',
            fare_category: 'M',
            fare_classes: 'R',
            fare_family: '',
            return: 0,
            bags_recheck_required: false,
            vi_connection: false,
            guarantee: false,
            vehicle_type: 'aircraft',
            local_arrival: '2023-05-01T14:25:00.000Z',
            utc_arrival: '2023-05-01T12:25:00.000Z',
            local_departure: '2023-05-01T13:05:00.000Z',
            utc_departure: '2023-05-01T11:05:00.000Z',
          },
        ],
        local_arrival: '2023-05-01T14:25:00.000Z',
        utc_arrival: '2023-05-01T12:25:00.000Z',
        local_departure: '2023-05-01T13:05:00.000Z',
        utc_departure: '2023-05-01T11:05:00.000Z',
      },
    ],
    search_params: {
      flyFrom_type: 'airport',
      to_type: 'airport',
      seats: {
        passengers: 3,
        adults: 1,
        children: 1,
        infants: 1,
      },
    },
  },
];
const flightsRW: ApiResponse[] = [
  {
    search_id: 'e81b96b9-1c95-921e-0037-3588104e15e4',
    currency: 'EUR',
    data: [
      {
        id: '25c312624c164c2542ba4d44_0|25c312624c164c2542ba4d44_1',
        flyFrom: 'CDG',
        flyTo: 'DUS',
        cityFrom: 'Paris',
        cityCodeFrom: 'PAR',
        cityTo: 'Düsseldorf',
        cityCodeTo: 'DUS',
        countryFrom: {
          code: 'FR',
          name: 'France',
        },
        countryTo: {
          code: 'DE',
          name: 'Germany',
        },
        duration: { total: 4500 },
        price: 368,
        fare: {
          adults: 171.17,
          children: 171.17,
          infants: 25.67,
        },
        bags_price: {
          '1': 85,
        },
        baglimit: {
          hand_height: 35,
          hand_length: 55,
          hand_weight: 12,
          hand_width: 25,
          hold_dimensions_sum: 158,
          hold_height: 52,
          hold_length: 78,
          hold_weight: 23,
          hold_width: 28,
        },
        availability: {
          seats: null,
        },
        airlines: ['AF'],
        route: [
          {
            id: '25c312624c164c2542ba4d44_0',
            combination_id: '25c312624c164c2542ba4d44',
            flyFrom: 'CDG',
            flyTo: 'DUS',
            cityFrom: 'Paris',
            cityCodeFrom: 'PAR',
            cityTo: 'Düsseldorf',
            cityCodeTo: 'DUS',
            airline: 'AF',
            flight_no: 1306,
            operating_carrier: 'A5',
            operating_flight_no: '',
            fare_basis: 'VH50TALG',
            fare_category: 'M',
            fare_classes: 'V',
            fare_family: '',
            return: 0,
            bags_recheck_required: false,
            vi_connection: false,
            guarantee: false,
            vehicle_type: 'aircraft',
            local_arrival: '2023-05-01T08:25:00.000Z',
            utc_arrival: '2023-05-01T06:25:00.000Z',
            local_departure: '2023-05-01T07:10:00.000Z',
            utc_departure: '2023-05-01T05:10:00.000Z',
          },
        ],
        local_arrival: '2023-05-01T08:25:00.000Z',
        utc_arrival: '2023-05-01T06:25:00.000Z',
        local_departure: '2023-05-01T07:10:00.000Z',
        utc_departure: '2023-05-01T05:10:00.000Z',
      },
    ],
    search_params: {
      flyFrom_type: 'airport',
      to_type: 'airport',
      seats: {
        passengers: 3,
        adults: 1,
        children: 1,
        infants: 1,
      },
    },
  },
];

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
})
export class BookingListComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  // this to be in the store
  currentOptions: {
    direct: { activeVariant: ApiResponse | null; confirmed: boolean };
    return: { activeVariant: ApiResponse | null; confirmed: boolean };
  } = {
    direct: { activeVariant: null, confirmed: false },
    return: { activeVariant: null, confirmed: false },
  };

  directFlights$: Observable<(ApiResponse | null)[]> = of(
    (Array(5).fill(flightsFW[0]) as ApiResponse[]).map((f, i) => {
      if (i === 0) return null;
      return {
        ...f,
        search_id: `F${i}`,
      };
    })
  );
  returnFlights$ = of(
    (Array(5).fill(flightsRW[0]) as ApiResponse[]).map((f, i) => ({
      ...f,
      search_id: `R${i}`,
    }))
  );
  ngOnInit(): void {
    this.subs.push(
      this.directFlights$.subscribe((items) => {
        this.currentOptions.direct = {
          activeVariant: items[2],
          confirmed: false,
        };
      })
    );
    this.subs.push(
      this.returnFlights$.subscribe((items) => {
        this.currentOptions.return = {
          activeVariant: items[2],
          confirmed: false,
        };
      })
    );
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
  onSwitchCurrentCard(id: string | null) {
    console.log('emitted card id ', id);
    //this.store.dispatch(SearchActions.setDate(clickedOne))
  }
  onConfirmToggle(
    type: keyof typeof this.currentOptions | null = null,
    value: boolean
  ) {
    if (!type) return;
    if (this.currentOptions[type]) {
      this.currentOptions[type].confirmed = value;
    }
  }

  handleForward(type: keyof typeof this.currentOptions | null = null) {
    //this.store.dispatch(SearchActions.incrementDate())
  }
  handleBackward(type: keyof typeof this.currentOptions | null = null) {
    //this.store.dispatch(SearchActions.decrementDate())
  }
}
