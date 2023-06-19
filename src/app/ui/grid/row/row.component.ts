import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { GridBreakpointName } from '../../theme/utils/grid-breakpoints.util';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
})
export class RowComponent implements OnInit {
  @Input() noPadding = false;

  @Input() set mode(mode: string | GridBreakpointName | null) {
    this.update(mode ?? GridBreakpointName.Xs);
  }

  @HostBinding('class.no-padding') get isNoPadding(): boolean {
    return this.noPadding;
  }

  private lastMode: string | GridBreakpointName | null = null;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit() {
    if (!this.lastMode) {
      this.update(GridBreakpointName.Xs);
    }
  }

  private update(mode: string | GridBreakpointName) {
    if (this.lastMode !== mode) {
      if (this.lastMode) {
        this.renderer.removeClass(this.elementRef.nativeElement, `row-${mode}`);
      }
      this.lastMode = mode;
      this.renderer.addClass(this.elementRef.nativeElement, `row-${mode}`);
    }
  }
}
