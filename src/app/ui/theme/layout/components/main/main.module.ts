import { NgModule } from '@angular/core';
import { ContainerModule } from 'src/app/ui/container/container.module';
import { MainComponent } from './main.component';

@NgModule({
  imports: [ContainerModule],
  declarations: [MainComponent],
  exports: [MainComponent],
})
export class MainModule {}
