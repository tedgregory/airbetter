import { NgModule } from '@angular/core';
import { FlightsService } from './flights.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
  providers: [FlightsService],
})
export class FlightsServiceModule {}
