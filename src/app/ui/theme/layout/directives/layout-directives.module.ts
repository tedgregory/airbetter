import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from './click-outside.directive';
import { RangeBackgroundDirective } from './range-background.directive';

const directives = [ClickOutsideDirective, RangeBackgroundDirective];

@NgModule({
  declarations: [...directives],
  exports: [...directives],
})
export class LayoutDirectivesModule {}
