import { NgModule } from '@angular/core';
import { RangeBackgroundDirective } from './range-background.directive';
import { SlideActiveBgDirective } from './slide-active-bg.directive';

const directives = [RangeBackgroundDirective, SlideActiveBgDirective];

@NgModule({
  declarations: [...directives],
  exports: [...directives],
})
export class BookingDirectivesModule {}
