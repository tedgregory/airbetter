import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingInfoPanelComponent } from './booking-info-panel.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [BookingInfoPanelComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatInputModule],
  exports: [BookingInfoPanelComponent],
})
export class BookingInfoPanelModule {}
