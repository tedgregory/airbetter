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
  @Input('appRangeBackground') value = 0;
  @Input()
  bgBreakpoints = [30, 20, 10];

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterContentChecked(): void {
    let className = 'seats--z';
    if (this.value <= this.bgBreakpoints[0]) {
      className = 'seats--l';
    }
    if (this.value <= this.bgBreakpoints[1]) {
      className = 'seats--m';
    }
    if (this.value <= this.bgBreakpoints[2]) {
      className = 'seats--s';
    }
    this.el.nativeElement.classList.add(className);
  }
}
