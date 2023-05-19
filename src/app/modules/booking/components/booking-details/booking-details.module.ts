import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDetailsComponent } from './booking-details.component';
import { BookingPipesModule } from '../../pipes/booking-pipes.module';
import { MatButtonModule } from '@angular/material/button';
import { CoreDirectivesModule } from 'src/app/core/directives/core-directives.module';
import { RangeBackgroundDirective } from '../../directives/range-background.directive';

@NgModule({
  declarations: [BookingDetailsComponent, RangeBackgroundDirective],
  imports: [
    CommonModule,
    BookingPipesModule,
    MatButtonModule,
    CoreDirectivesModule,
  ],
  exports: [BookingDetailsComponent],
})
export class BookingDetailsModule {}
