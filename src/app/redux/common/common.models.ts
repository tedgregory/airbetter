export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export interface ContactDetails {
  countryCode: string;
  phone: string;
  email: string;
}

export enum DateFormats {
  DMY = 'DD/MM/YYYY',
  MDY = 'MM/DD/YYYY',
  YDM = 'YYYY/DD/MM',
  YMD = 'YYYY/MM/DD',
}

export enum EStatus {
  Default = 'Default',
  Loading = 'Loading',
  Error = 'Error',
  Loaded = 'Loaded',
}

export enum ESeatsBreakpoints {
  L = 30,
  M = 20,
  S = 10,
}

export enum PassengerType {
  Adult = 'Adult',
  Child = 'Child',
  Infant = 'Infant',
}
