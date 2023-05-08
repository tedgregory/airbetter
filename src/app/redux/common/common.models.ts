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
