export interface SearchState {
  flyFrom: string;
  flyTo: string;
  dateLeave: string | null;
  dateReturn: string | null;
  //passengersCount: [number, number, number]; // adults/children/infants
  currency: string;
  dateFormat: DateFormats;
}
export enum DateFormats {
  DMY = 'DD/MM/YYYY',
  MDY = 'MM/DD/YYYY',
  YDM = 'YYYY/DD/MM',
  YMD = 'YYYY/MM/DD',
}
