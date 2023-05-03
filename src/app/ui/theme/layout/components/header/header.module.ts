import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ContainerModule } from 'src/app/ui/container/container.module';
import { GridModule } from 'src/app/ui/grid/grid.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HelpDialogModule } from './components/help-dialog/help-dialog.module';
import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutDirectivesModule } from '../../directives/layout-directive.module';

@NgModule({
  // imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, HelpDialogModule, MatDialogModule, NavigationSharedModule],
  imports: [
    CommonModule,
    RouterModule,
    ContainerModule,
    GridModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    HelpDialogModule,
    MatDialogModule,
    LayoutDirectivesModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
