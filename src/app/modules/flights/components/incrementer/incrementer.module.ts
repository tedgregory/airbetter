import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IncrementerComponent } from './incrementer.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [IncrementerComponent],
  exports: [IncrementerComponent],
})
export class IncrementerModule {}
