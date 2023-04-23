import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export interface PaymentIconConfig {
  name: string;
  path: string;
}

const icons: PaymentIconConfig[] = [
  {
    name: 'appPaymentMastercard',
    path: 'assets/icons/icon-payment-mastercard.svg',
  },
  {
    name: 'appPaymentAmazonPay',
    path: 'assets/icons/icon-payment-amazon-pay.svg',
  },
  {
    name: 'appPaymentAmericanExpress',
    path: 'assets/icons/icon-payment-american-express.svg',
  },
  {
    name: 'appPaymentVisa',
    path: 'assets/icons/icon-payment-visa.svg',
  },
];

@NgModule({
  imports: [MatIconModule],
  exports: [MatIconModule],
})
export class PaymentIconsModule {
  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer
  ) {
    icons.forEach((icon) => this.add(icon));
  }

  private add(config: PaymentIconConfig) {
    this.matIconRegistry.addSvgIcon(
      config.name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(config.path)
    );
  }
}
