import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationPath } from 'src/app/core/navigation/models/navigation.interface';
import { HelpDialogComponent } from './components/help-dialog/help-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  NavigationPath = NavigationPath;

  constructor(private readonly matDialog: MatDialog) {}

  onOpenDialog() {
    this.matDialog.open(HelpDialogComponent);
  }
}
