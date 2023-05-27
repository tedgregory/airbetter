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
    const [available, total] = this.value;
    let className = '';
    if (total / available >= 2) {
      className = 'seats--l';
    }
    if (total / available < 2) {
      className = 'seats--m';
    }
    if (available < 10) {
      className = 'seats--s';
    }
    this.el.nativeElement.classList.remove(
      'seats--s',
      'seats--m',
      'seats--l',
      'seats--z'
    );
    this.el.nativeElement.classList.add(className);
  }
}
