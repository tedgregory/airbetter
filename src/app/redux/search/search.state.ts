import { DateFormats } from '../common/common.models';

export interface SearchState {
  flyFrom: string;
  flyTo: string;
  dateLeave: string | null;
  dateReturn: string | null;
  //passengersCount: [number, number, number]; // adults/children/infants
  currency: string;
  dateFormat: DateFormats;
  step: 1 | 2 | 3;
}
