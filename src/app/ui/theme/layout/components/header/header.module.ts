import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ContainerModule } from 'src/app/ui/container/container.module';
import { GridModule } from 'src/app/ui/grid/grid.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AuthModalModule } from './components/auth-modal/auth-modal.module';
import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoreDirectivesModule } from 'src/app/core/directives/core-directives.module';
import { CoreServiceModule } from 'src/app/core/services/core-service.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ContainerModule,
    GridModule,
    CoreServiceModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    AuthModalModule,
    CoreDirectivesModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
