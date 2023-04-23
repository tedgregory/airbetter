import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookingListComponent } from './booking-list.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [BookingListComponent],
  exports: [BookingListComponent],
})
export class BookingListModule {}
