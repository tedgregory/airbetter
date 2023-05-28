import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { ModalPosition } from '../../../../interfaces/layout.interfaces';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
})
export class UserModalComponent {
  @HostBinding('class') class = 'user-modal';

  @HostBinding('class.visible') get isVisible() {
    return this.isOpen;
  }

  @Input() isOpen = false;

  @Input() position: ModalPosition = {
    pos: 'static',
    rightTopX: 0,
    rightTopY: 0,
  };

  @Output() closeModal = new EventEmitter<void>();

  constructor(private element: ElementRef) {}

  onModalClose() {
    this.closeModal.emit();
  }

  clickedOutsideModal(el: HTMLElement) {
    if (el === this.element.nativeElement && this.isOpen) {
      this.closeModal.emit();
    }
  }
}
