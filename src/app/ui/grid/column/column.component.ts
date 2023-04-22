import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { GridBreakpointName } from '../../theme/utils/grid-breakpoints.util';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
})
export class ColumnComponent implements OnInit {
  private lastModes: Partial<Record<GridBreakpointName, number>> | null = null;

  @Input() set modes(modes: Partial<Record<GridBreakpointName, number>>) {
    this.update(modes ?? { [GridBreakpointName.Xs]: 0 });
  }

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit() {
    if (!this.lastModes) {
      this.update({ [GridBreakpointName.Xs]: 0 });
    }
  }

  private update(modes: Partial<Record<GridBreakpointName, number>>) {
    if (
      !this.lastModes ||
      JSON.stringify(this.lastModes) !== JSON.stringify(modes)
    ) {
      if (this.lastModes) {
        for (const [key, value] of Object.entries(this.lastModes)) {
          let className = `column-${key}`;
          if (value && value > 0) {
            className += `-${value}`;
          }
          this.renderer.removeClass(this.elementRef.nativeElement, className);
        }
      }
      this.lastModes = modes;
      for (const [key, value] of Object.entries(this.lastModes)) {
        let className = `column-${key}`;
        if (value && value > 0) {
          className += `-${value}`;
        }
        this.renderer.addClass(this.elementRef.nativeElement, className);
      }
    }
  }
}
