import {
  AfterContentChecked,
  Directive,
  ElementRef,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appRangeBackground]',
})
export class RangeBackgroundDirective implements AfterContentChecked {
  @Input('appRangeBackground') value = [0, 0];

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterContentChecked(): void {
    let className = 'seats--z';
    if (this.value[0] / this.value[1] >= 2) {
      className = 'seats--l';
    }
    if (this.value[0] / this.value[1] < 2) {
      className = 'seats--m';
    }
    if (this.value[1] < 10) {
      className = 'seats--s';
    }
    this.el.nativeElement.classList.add(className);
  }
}
