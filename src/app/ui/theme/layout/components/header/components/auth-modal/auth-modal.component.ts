import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ModalPosition } from '../../../../interfaces/layout.interfaces';
import { Store } from '@ngrx/store';
import {
  selectIsAuth,
  selectLoaded,
  selectLoading,
} from 'src/app/redux/auth/auth.selectors';
import { filter, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
})
export class AuthModalComponent implements OnInit {
  @HostBinding('class') class = 'auth-modal';

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

  isAuth$ = this.store.select(selectIsAuth);

  authLoading$ = this.store.select(selectLoading);

  authLoaded$ = this.store.select(selectLoaded);

  constructor(private element: ElementRef, private store: Store) {}

  ngOnInit() {
    this.handleAuthSuccess();
  }

  handleAuthSuccess() {
    this.isAuth$
      .pipe(
        filter((isAuth) => isAuth),
        take(1),
        switchMap(() => this.authLoaded$.pipe(filter((loaded) => loaded))),
        take(1)
      )
      .subscribe(() => {
        this.closeModal.emit();
      });
  }

  onModalClose() {
    this.closeModal.emit();
  }

  clickedOutsideModal(el: HTMLElement) {
    if (el === this.element.nativeElement && this.isOpen) {
      this.closeModal.emit();
    }
  }
}
