import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpDialogComponent {}
