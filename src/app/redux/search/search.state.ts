import { DateFormats } from '../common/common.models';

export interface SearchState {
  flyFrom: { iata: string; title: string };
  flyTo: { iata: string; title: string };
  dateLeave: string | null;
  dateReturn: string | null;
  isReturn: boolean;
  currency: string;
  dateFormat: DateFormats;
  step: {
    first: boolean;
    second: boolean;
    third: boolean;
  };
}
