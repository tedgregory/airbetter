import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from './click-outside.directive';

const directives = [ClickOutsideDirective];

@NgModule({
  declarations: [...directives],
  exports: [...directives],
})
export class CoreDirectivesModule {}
