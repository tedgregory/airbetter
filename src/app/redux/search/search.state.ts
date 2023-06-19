import { CountsOptions } from 'src/app/modules/flights/components/select-passengers/select-passengers.component';
import { ECurrencies, EDateFormats } from '../common/common.models';

export interface SearchState {
  flyFrom: { iata: string; title: string };
  flyTo: { iata: string; title: string };
  dateLeave: string | null;
  dateReturn: string | null;
  isReturn: boolean;
  currency: ECurrencies;
  dateFormat: EDateFormats;
  error: Error | null;
}

export type ISearchData = Pick<
  SearchState,
  'dateLeave' | 'dateReturn' | 'isReturn' | 'flyFrom' | 'flyTo'
> & { passengers: CountsOptions };
