import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { ApiResponse } from '../../models/booking.interface';
import { Store } from '@ngrx/store';
import { BookingActions } from 'src/app/redux/actions/booking.actions';
// import { BookingVariant } from '../../models/booking.interface';
// import { BookingService } from '../../services/booking.service';
const flightsFW: ApiResponse[] = [
  {
    search_id: '66906068-44b7-b52b-d1f0-48e421497202',
    currency: 'EUR',
    data: [
      {
        id: '126225c34c164c299a05a957_0|126225c34c164c299a05a957_1',
        booking_token:
          'F77mbTHKlr3m0ZMNkkSed7yzE8Fj7vHCxSKMDBHBPOeuwASQFw0lc2FPsaaQtmktS0oE_nUadE4waEOKS12lWHm-mQWB7Or8ASl-Mc3wQkdNT_QczPhn4vgOBygOUhhhgsvTBs59GPLW0EKbKR-CIpUkK6WwCpmy7StlrY55RARxW4TdaF174nOOEGD5K-grsYBEKhVxdckx8msN_JnItAauo63WfKmhe-nIn_SJeSu0rONJub3zqFtFDXuKPCP0IUa4x0KeVETwqgVcyu0EfUVOHPO6wb1enmU9MFLgcjqj0Cly_3JrBfhEBJY7nlNQXZNhCYysby8RMTOfe-ok5XgxNGJ6I45u289I3lNwVPoS0FX1nTC5k_uks_kKXDSMn1v2iRMxN3RkVXBzwMSk8QT8_kp9EBV2tOHoJ780BtPt_xezbmCQPkrj-iPteDjBnvjHTZfaTEh4Z6RIeRbFOclKjOe8O5ev7-f-1NBCpn66Pb62Ts-3ILDnb3QTPkKs3ML6raPNvtWLl97sE8Ol-XebYiD6lYkuDXAQOTdFnQTK-Gd_8iArJ2I7_wYOCokRW84pWzH6gzKMP79p5IysGOYC-Qtzf7IW0N-F3cHDCHMHmM1FEErwalcCDH9pB_LGqNQjsl5T7SgkvmKAA1WqmYN2Ie5qUU0FcG0TaRuBv4Ftyc2iEs-aKHmeqEZOebJefU23PWVb5G_ZmlTEzDHUJNr5dFBK57AKvAuPG6PLutx6JnjbzjWvBIzt9kZ2q1fwfLuzciLfRSxXph2vw7Ncsxg==',
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
        conversion: {
          EUR: 364,
        },
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
        booking_token:
          'FI1BCeJ8jdI8sON3ZMomLJWDXm8veHdefYFDeuS--Z3Vo7pC613qAwJ2-Y4VfCO7xTYyy9mP64bGD7aDdScdIqTSi0ouO7kDquY_lEmILlVekQKLWn37xTNpBxpt88K_hFuXIHbvbISZ0DwSLBgPxa1TW-jTMPSllWwNZyMc1qHh2dyQOkyG9lj2YXyGw2NRKsdJR_hUrc8XhUK-EYBZ-4VuEEIx21tBVBiec9BPeQMU1s8dqyXrd_8ar7GO6GD4vkIlOT9BoPWh-exc7s9xhVv2gs6ZucMiWYFV_QcubKPthGqzQgawQaaIgLhkecOqd9BVct_p-_gdnS2JWgatR3E-yyjfAPqZlb7OaUhqwKRt7Sdw4WrrhshgP7BrJZ_svuexKnonyMPHv2GfgsdTl_ut_CR_tGpWLpjHihyFK5FC_tjENkSot4V_NIOo7U2rfiFiN-Q0vKkAs7BUpivtc8lvSezoZHLmfrtCaVl4LSt5OV0GpxwwOrPR3uCwPHSYAJl4aUQe0JPbUPv56-2gNnkxiwBe8-QLoqEdqGWw3tWt4SAuEFlGo3B8synHLMgAh58dbBhG5IfFEXOXOjvHYY1ZPRw0fKzZQCV0xH2_w9Zxb9eYz1ky9SqpNxXVxvn4JKDWN-uwgG1RKnUIDSF02N-dQMSz7SLArmlhXq2a0THnzwdrjPJeAJlTfgopr_4Dr7TOTcz4G5h7CukTxPfxjdtkR1tImNLxJUgOyDldX_yUaXxM7BtaQ3c1iyOUwVzw7',
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
        conversion: {
          EUR: 368,
        },
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

  constructor(public store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(BookingActions.getVariants());
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
