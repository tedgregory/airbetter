import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationPath } from './core/navigation/models/navigation.interface';
import { LayoutComponent } from './ui/theme/layout/layout.component';
import { LayoutModule } from './ui/theme/layout/layout.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: NavigationPath.Flights,
        loadChildren: () =>
          import('src/app/modules/flights/pages/flights-page.module').then(
            (m) => m.FlightsPageModule
          ),
      },
      {
        path: NavigationPath.Booking,
        loadChildren: () =>
          import('src/app/modules/booking/pages/booking-page.module').then(
            (m) => m.BookingPageModule
          ),
      },
      {
        path: NavigationPath.Cart,
        loadChildren: () =>
          import('src/app/modules/user/pages/cart-page/cart-page.module').then(
            (m) => m.CartPageModule
          ),
      },
      {
        path: NavigationPath.UserAccount,
        loadChildren: () =>
          import('src/app/modules/user/pages/user-page/user-page.module').then(
            (m) => m.UserPageModule
          ),
      },

      {
        path: '**',
        loadChildren: () =>
          import('src/app/core/pages/not-found/not-found-page.module').then(
            (m) => m.NotFoundPageModule
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
