import {
  AfterContentChecked,
  Directive,
  ElementRef,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appSlideActiveBg]',
})
export class SlideActiveBgDirective implements AfterContentChecked {
  @Input('appSlideActiveBg') value = [0, 0];

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterContentChecked(): void {
    const [available, total] = this.value;
    const card = this.el.nativeElement;
    let className = 'active--m';
    if (total / available >= 2) {
      className = 'active--l';
    }
    if (total / available < 2) {
      className = 'active--m';
    }
    if (available < 10) {
      className = 'active--s';
    }
    card.classList.add(className);
  }
}
