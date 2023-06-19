import { NgModule } from '@angular/core';
import { ContainerModule } from 'src/app/ui/container/container.module';
import { GridModule } from 'src/app/ui/grid/grid.module';
import { FooterComponent } from './footer.component';

@NgModule({
  imports: [ContainerModule, GridModule],
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class FooterModule {}
