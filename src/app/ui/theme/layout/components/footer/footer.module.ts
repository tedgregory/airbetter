import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PaymentIconsModule } from '@app/ui/payment-icons';
import { FooterComponent } from './footer.component';
import { ContainerModule } from '@app/ui/container';
import { GridModule } from '@app/ui/grid';

@NgModule({
  imports: [PaymentIconsModule, MatButtonModule, ContainerModule, GridModule],
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class FooterModule {}
