import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export interface IconConfig {
  name: string;
  path: string;
}

const icons: IconConfig[] = [
  {
    name: 'appInfo',
    path: '/assets/icons/icon-info.svg',
  },
  {
    name: 'appExclamation',
    path: '/assets/icons/icon-exclamation-red.svg',
  },
  {
    name: 'appClose',
    path: '/assets/icons/icon-close.svg',
  },
  {
    name: 'appPlus',
    path: '/assets/icons/icon-plus.svg',
  },
  {
    name: 'appMinus',
    path: '/assets/icons/icon-minus.svg',
  },
  {
    name: 'appSwitch',
    path: '/assets/icons/icon-switch.svg',
  },
  {
    name: 'appFacebook',
    path: '/assets/icons/icon-facebook.svg',
  },
  {
    name: 'appGoogle',
    path: '/assets/icons/icon-google.svg',
  },
];

@NgModule({
  imports: [MatIconModule],
  exports: [MatIconModule],
})
export class IconsModule {
  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer
  ) {
    icons.forEach((icon) => this.add(icon));
  }

  private add(config: IconConfig): void {
    this.matIconRegistry.addSvgIcon(
      config.name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(config.path)
    );
  }
}
