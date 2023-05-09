import { Injectable } from '@angular/core';
import { debounceTime, fromEvent, tap } from 'rxjs';

@Injectable()
export class CoreService {
  onWindowResize(callback: (isResizing: boolean) => void) {
    const resize = fromEvent(window, 'resize');
    let isResizing = false;
    return resize
      .pipe(
        tap(() => {
          isResizing = true;
          callback(isResizing);
        }),
        debounceTime(200),
        tap(() => {
          isResizing = false;
          callback(isResizing);
        })
      )
      .subscribe();
  }
}
