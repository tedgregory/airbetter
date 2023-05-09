import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { AuthModalPosition } from '../../../../interfaces/layout.interfaces';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
})
export class AuthModalComponent {
  @HostBinding('class') class = 'auth-modal';

  @HostBinding('class.visible') get isVisible() {
    return this.isOpen;
  }

  @Input() isOpen = false;

  @Input() position: AuthModalPosition = {
    pos: 'static',
    rightTopX: 0,
    rightTopY: 0,
  };

  @Output() closeModal = new EventEmitter<void>();

  constructor(private element: ElementRef) {}

  onModalClose() {
    this.closeModal.emit();
  }

  clickedOutsideAuthModal(el: HTMLElement) {
    if (el === this.element.nativeElement && this.isOpen) {
      this.closeModal.emit();
    }
  }
}
