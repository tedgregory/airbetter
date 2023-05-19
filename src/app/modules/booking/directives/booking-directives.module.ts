import { NgModule } from '@angular/core';
import { RangeBackgroundDirective } from './range-background.directive';

const directives = [RangeBackgroundDirective];

@NgModule({
  declarations: [...directives],
  exports: [...directives],
})
export class BookingDirectivesModule {}
