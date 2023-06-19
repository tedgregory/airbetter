import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
})
export class ContainerComponent {
  @Input() mode!: 'flex' | 'flex-row' | 'fluid' | null;
  @Input() height!: 'max-height' | null;

  @HostBinding('class.is-flex') get isFlex(): boolean {
    return this.mode === 'flex';
  }

  @HostBinding('class.is-flex-row') get isFlexRow(): boolean {
    return this.mode === 'flex-row';
  }

  @HostBinding('class.is-fluid') get isFluid(): boolean {
    return this.mode === 'fluid';
  }

  @HostBinding('class.is-max-height') get isMaxHeight(): boolean {
    return this.height === 'max-height';
  }
}
