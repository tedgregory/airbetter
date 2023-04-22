import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsPageComponent } from './flights-page.component';

const routes: Routes = [
  {
    path: '',
    component: FlightsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlightsPageRoutingModule {}
