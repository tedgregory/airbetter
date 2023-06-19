import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from './not-found-page.component';
import { NotFoundPageRoutingModule } from './not-found-page-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, NotFoundPageRoutingModule, MatButtonModule],
  declarations: [NotFoundPageComponent],
})
export class NotFoundPageModule {}
