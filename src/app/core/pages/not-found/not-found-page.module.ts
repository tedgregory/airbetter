import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { NotFoundComponentsModule } from './components';
import { NotFoundPageComponent } from './not-found-page.component';
import { NotFoundPageRoutingModule } from './not-found-page-routing.module';

@NgModule({
  imports: [CommonModule, NotFoundPageRoutingModule],
  declarations: [NotFoundPageComponent],
})
export class NotFoundPageModule {}
