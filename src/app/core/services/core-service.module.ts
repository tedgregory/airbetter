import { NgModule } from '@angular/core';
import { CoreService } from './core.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  providers: [CoreService],
  imports: [HttpClientModule],
})
export class CoreServiceModule {}
