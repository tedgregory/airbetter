import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationPath } from '@app/core/navigation/models';
import { LayoutComponent, LayoutModule } from '@app/ui/theme/layout';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: NavigationPath.Flights,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        loadChildren: (): Promise<any> =>
          import('@app/flights/pages').then(
            (modules) => modules.FlightsPageModule
          ),
      },
      {
        path: NavigationPath.Booking,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        loadChildren: (): Promise<any> =>
          import('@app/booking/pages').then(
            (modules) => modules.BookingPageModule
          ),
      },
      {
        path: '**',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        loadChildren: (): Promise<any> =>
          import('@app/core/pages/not-found').then(
            (modules) => modules.NotFoundPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    LayoutModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      // initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
