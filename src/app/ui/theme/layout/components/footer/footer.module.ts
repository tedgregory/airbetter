import { NgModule } from '@angular/core';
import { ContainerModule } from 'src/app/ui/container/container.module';
import { GridModule } from 'src/app/ui/grid/grid.module';
import { PaymentIconsModule } from 'src/app/ui/payment-icons/payment-icons.module';
import { FooterComponent } from './footer.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [PaymentIconsModule, MatButtonModule, ContainerModule, GridModule],
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class FooterModule {}
