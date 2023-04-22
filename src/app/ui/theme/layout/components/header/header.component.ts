import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationPath } from '@app/core/navigation/models';
import { HelpDialogComponent } from './components/help-dialog/help-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  NavigationPath = NavigationPath;

  constructor(private readonly matDialog: MatDialog) {}

  onOpenDialog() {
    this.matDialog.open(HelpDialogComponent);
  }
}
