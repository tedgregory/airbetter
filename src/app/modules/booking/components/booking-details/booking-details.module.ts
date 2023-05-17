import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDetailsComponent } from './booking-details.component';
import { BookingPipesModule } from '../../pipes/booking-pipes.module';
import { MatButtonModule } from '@angular/material/button';
import { LayoutDirectivesModule } from 'src/app/ui/theme/layout/directives/layout-directives.module';

@NgModule({
  declarations: [BookingDetailsComponent],
  imports: [
    CommonModule,
    BookingPipesModule,
    MatButtonModule,
    LayoutDirectivesModule,
  ],
  exports: [BookingDetailsComponent],
})
export class BookingDetailsModule {}
