import { Injectable } from '@angular/core';
import { Config } from './config.interface';

export const CONFIG_DEFAULT: Config = {
  ApiKey: '',
};

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly config: Config;

  constructor() {
    this.config = {
      // ApiKey: process.env.API_KEY ?? CONFIG_DEFAULT.ApiKey,
      ApiKey: CONFIG_DEFAULT.ApiKey,
    };
  }

  getConfig(): Config {
    return this.config;
  }
}
