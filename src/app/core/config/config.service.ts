import { Injectable } from '@angular/core';
import { Config } from './config.interface';

export const CONFIG_DEFAULT: Config = {
  ApiUrl: {
    base: 'https://api.air-ways.online/search',
    flight: '/flight',
    airport: '/airport',
  },
  ApiKey: '1fALT1a48faOP1_mJNETCkpbclAtiJoe',
  ApiDateFormat: 'DD/MM/YYYY',
};

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly config: Config;

  constructor() {
    this.config = {
      ApiUrl: CONFIG_DEFAULT.ApiUrl,
      // ApiKey: process.env.API_KEY ?? CONFIG_DEFAULT.ApiKey,
      ApiKey: CONFIG_DEFAULT.ApiKey,
      ApiDateFormat: CONFIG_DEFAULT.ApiDateFormat,
    };
  }

  getConfig(): Config {
    return this.config;
  }
}
