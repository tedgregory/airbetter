import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSortModule,
    FormsModule,
    TableModule,
    RouterModule,
  ],
  exports: [UserComponent],
})
export class UserModule {}
