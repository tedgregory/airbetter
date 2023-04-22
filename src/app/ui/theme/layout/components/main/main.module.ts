import { NgModule } from '@angular/core';
import { ContainerModule } from '@app/ui/container';
import { MainComponent } from './main.component';

@NgModule({
  imports: [ContainerModule],
  declarations: [MainComponent],
  exports: [MainComponent],
})
export class MainModule {}
